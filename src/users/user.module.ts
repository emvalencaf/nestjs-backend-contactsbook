// decorators
import { Module } from '@nestjs/common';

// modules
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UserProfileEntity } from './entities/user-profile.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, UserProfileEntity]),
        JwtModule,
    ],
    exports: [UserService],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
