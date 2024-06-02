// decorators
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// typeorm
import { DataSource, Repository, UpdateResult } from 'typeorm';

// dtos
import { CreateUserDTO } from './dtos/create-user.dto';

// entities
import { UserEntity } from './entities/user.entity';
import { UserProfileEntity } from './entities/user-profile.entity';
import { UpdateUserProfileDTO } from './dtos/update-user-profile.dto';

// utils
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        private readonly dataSourceRepository: DataSource,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(UserProfileEntity)
        private readonly userProfileRepository: Repository<UserProfileEntity>,
    ) {}

    // get an user by username
    async getByUsername(
        username: string,
        showProfile: boolean = false,
    ): Promise<UserEntity> {
        return this.userRepository.findOne({
            where: { username },
            relations: { profile: showProfile },
        });
    }

    // create an user
    async create(user: CreateUserDTO) {
        // encripty password
        const salt = 10;

        user.password = await hash(user.password, salt);

        const queryRunner = this.dataSourceRepository.createQueryRunner();
        return await queryRunner.query(
            'CALL insert_new_user(?, ?, ?, ?, ?, ?)',
            [
                user.firstName,
                user.lastName,
                user.birthday,
                user.username,
                user.password,
                user.email,
            ],
        );
    }

    // get an user by id
    async getById(
        userId: number,
        showPassword: boolean = false,
        showProfile: boolean = false,
        onlyShowProfile: boolean = false,
    ): Promise<UserEntity | UserProfileEntity> {
        // only shows user profile
        if (onlyShowProfile)
            return this.userProfileRepository.findOne({
                where: { id: userId },
            });

        // only show user credentials
        return this.userRepository.findOne({
            select: {
                username: true,
                password: showPassword,
                email: true,
            },
            where: {
                id: userId,
            },
            relations: {
                profile: showProfile,
            },
        });
    }

    // update user profile
    async updateProfile(
        userId: number,
        profile: UpdateUserProfileDTO,
    ): Promise<UpdateResult> {
        return this.userProfileRepository.update(userId, {
            ...profile,
        });
    }
}
