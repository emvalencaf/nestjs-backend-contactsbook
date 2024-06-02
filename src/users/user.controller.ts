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
import { Public } from '../decorators/public.decorator';

// dtos
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserProfileDTO } from './dtos/update-user-profile.dto';
import { ReturnedCreatedUserDTO } from './dtos/returned-created-user.dto';

// services
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // create an user
    @Public()
    @UsePipes(ValidationPipe)
    @Post()
    async create(@Body() user: CreateUserDTO): Promise<object> {
        try {
            const response = await this.userService.create({ ...user });
            const result = response[0][0];
            return {
                result: new ReturnedCreatedUserDTO(result),
                message: 'Created user.',
                statusCode: 201,
            };
        } catch (err) {
            return {
                message: err?.driverError?.sqlMessage || 'Internal Error',
                statusCode: (err?.driverError?.sqlMessage && 400) || 500,
            };
        }
    }

    @Get('/:userId')
    async getById(@Param('userId') userId: number) {
        try {
            const user = this.userService.getById(userId);

            if (!user)
                return {
                    result: {},
                    message: 'No user was found it',
                    statusCode: 404,
                };

            return {
                result: user,
                message: 'fetched an user',
                statusCode: 200,
            };
        } catch (err) {
            console.log(err);
            return {
                message: err?.driverError?.sqlMessage || 'Internal Error',
                statusCode: (err?.driverError?.sqlMessage && 400) || 500,
            };
        }
    }

    // update profile
    @Patch('/profile/:userId')
    async updateProfile(
        @Param('userId') userId: number,
        @Body() profile: UpdateUserProfileDTO,
    ) {
        try {
            return {
                result: await this.userService.updateProfile(userId, profile),
                message: 'Updated profile user',
                statusCode: 200,
            };
        } catch (err) {
            console.log(err);
            return {
                message: err?.driverError?.sqlMessage || 'Internal Error',
                statusCode: (err?.driverError?.sqlMessage && 400) || 500,
            };
        }
    }
}
