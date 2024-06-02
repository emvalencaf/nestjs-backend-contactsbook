import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from './entities/contact.entity';
import { ContactPhoneEntity } from './entities/contact-phone.entity';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ContactEntity, ContactPhoneEntity])],
    exports: [],
    controllers: [ContactController],
    providers: [ContactService],
})
export class ContactModule {}
