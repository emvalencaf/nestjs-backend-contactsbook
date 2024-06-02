// decorators
import { Module } from '@nestjs/common';

// modules
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';

// guards
import { AuthGuard } from './guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env.dev.local'],
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            database: process.env.DB_DATABASE,
            host: process.env.DB_HOST,
            password: process.env.DB_PASSWORD,
            username: process.env.DB_USERNAME,
            port: Number(process.env.DB_PORT),
            entities: [`${__dirname}/**/*.entity{.js,.ts}`],
            synchronize: false,
        }),
        UserModule,
        AuthModule,
        JwtModule,
    ],
    controllers: [],
    providers: [
        {
            provide: 'APP_GUARD',
            useClass: AuthGuard,
        },
    ],
})
export class AppModule {}
