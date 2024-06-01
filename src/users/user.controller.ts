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

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // create an user
    @UsePipes(ValidationPipe)
    @Post()
    async create(@Body() user: CreateUserDTO): Promise<object> {
        const result_msg: string = await this.userService.create({ ...user });

        return {
            result_msg: result_msg,
        };
    }

    @Get()
    async get() {
        return 'Testando!';
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
