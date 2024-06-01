// decorators
import { Module } from '@nestjs/common';

// modules
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// controllers
import { AppController } from './app.controller';

// services
import { AppService } from './app.service';

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
            synchronize: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
