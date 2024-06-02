// decorators
import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';

// dtos
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserProfileDTO } from './dtos/update-user-profile.dto';

// typeorm
import { UpdateResult } from 'typeorm';

// services
import { UserService } from './user.service';

// entities
import { UserEntity } from './entities/user.entity';
import { UserProfileEntity } from './entities/user-profile.entity';
import { Public } from '../decorators/public.decorator';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // create an user
    @Public()
    @UsePipes(ValidationPipe)
    @Post()
    async create(@Body() user: CreateUserDTO): Promise<object> {
        const result_msg: string = await this.userService.create({ ...user });

        return {
            result_msg: result_msg,
        };
    }

    @Get('/:userId')
    async getById(
        @Param('userId') userId: number,
    ): Promise<UserEntity | UserProfileEntity> {
        return this.userService.getById(userId);
    }

    // update profile
    @Patch('/profile/:userId')
    async updateProfile(
        @Param('userId') userId: number,
        @Body() profile: UpdateUserProfileDTO,
    ): Promise<UpdateResult> {
        return this.userService.updateProfile(userId, profile);
    }
}
