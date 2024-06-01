// decorators
import { Module } from '@nestjs/common';

// modules
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UserProfileEntity } from './entities/user-profile.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, UserProfileEntity])],
    exports: [],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
