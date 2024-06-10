// decorators
import { Module } from '@nestjs/common';

// modules
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../users/user.module';

// controllers
import { AuthController } from './auth.controller';

// services
import { AuthService } from './auth.service';

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.NESTJS_APP_JWT_SECRET || 'default_secret',
                signOptions: {
                    expiresIn: process.env.NESTJS_APP_JWT_EXPIRES_IN || '3600s',
                },
            }),
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
