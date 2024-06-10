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
import { ContactModule } from './contacts/contact.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env'],
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            database: process.env.MYSQLDB_DATABASE,
            host: process.env.MYSQLDB_HOST,
            password: process.env.MYSQLDB_PASSWORD,
            username: process.env.MYSQLDB_USER,
            port: Number(process.env.MYSQLDB_LOCAL_PORT),
            entities: [`${__dirname}/**/*.entity{.js,.ts}`],
            synchronize: false,
        }),
        UserModule,
        ContactModule,
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
