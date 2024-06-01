// decorators
import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// typeorm
import { DataSource, Repository, UpdateResult } from 'typeorm';

// dtos
import { CreateUserDTO } from './dtos/create-user.dto';

// entities
import { UserEntity } from './entities/user.entity';
import { UserProfileEntity } from './entities/user-profile.entity';
import { UpdateUserProfileDTO } from './dtos/update-user-profile.dto';

// import { ReturnedCreatedUserDTO } from './dtos/returned-created-user.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly dataSourceRepository: DataSource,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(UserProfileEntity)
        private readonly userProfileRepository: Repository<UserProfileEntity>,
    ) {}

    // create an user
    async create(@Body() user: CreateUserDTO): Promise<string> {
        try {
            const queryRunner = this.dataSourceRepository.createQueryRunner();
            const queryResult = await queryRunner.query(
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

            console.log('[server]: user created!');

            return queryResult;
        } catch (err) {
            console.log(err);
            return err?.driverError?.sqlMessage;
        }
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
