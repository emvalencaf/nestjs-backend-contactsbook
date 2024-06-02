// decorators
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { UserId } from '../decorators/user-id.decorator';
import { CreateContactDTO } from './dtos/create-contact.dto';
import { UpdateContactPhoneDTO } from './dtos/update-contact-phone.dto';
import { CreateContactPhoneDTO } from './dtos/create-contact-phone.dto';
import { ContactPhoneEntity } from './entities/contact-phone.entity';
import { UpdateContactDTO } from './dtos/update-contact.dto';

@Controller('contacts')
export class ContactController {
    constructor(private readonly contactService: ContactService) {}

    // create a new user's contact
    @Post()
    @UsePipes(ValidationPipe)
    async createContact(
        @UserId() userId: number,
        @Body() contact: CreateContactDTO,
    ) {
        try {
            const { result } = await this.contactService.createContact(
                userId,
                contact,
            );

            return {
                statusCode: 200,
                result: result,
            };
        } catch (err) {
            return err;
        }
    }

    // get all user's contacts
    @Get()
    async getAllContactsFromUser(@UserId() userId: number) {
        try {
            return this.contactService.getAllContactsFromUser(userId);
        } catch (err) {
            return err;
        }
    }

    // update an user's contact
    @Patch('/:contactId')
    async updateContact(
        @UserId() userId: number,
        @Param('contactId') contactId: number,
        @Body() contact: UpdateContactDTO,
    ) {
        return this.contactService.updateContact(userId, contactId, contact);
    }

    @Delete('/:contactId')
    async deleteContact(
        @UserId() userId: number,
        @Param('contactId') contactId: number,
    ) {
        return this.contactService.deleteContact(userId, contactId);
    }
    // create a new contact's phone
    @Post('/:contactId/phones')
    async createPhone(
        @UserId() userId: number,
        @Param('contactId') contactId: number,
        @Body() phone: CreateContactPhoneDTO,
    ) {
        return this.contactService.createPhone(userId, contactId, phone);
    }

    // get all phones from an contact
    @Get('/:contactId/phones')
    async getAllPhonesFromContact(
        @UserId() userId: number,
        @Param('contactId') contactId: number,
    ): Promise<ContactPhoneEntity[]> {
        return this.contactService.getAllPhonesFromContact(userId, contactId);
    }

    // partial update contact's phone
    @Patch('/:contactId/phones/:phoneId')
    async updatePhone(
        @UserId() userId: number,
        @Param('contactId') contactId: number,
        @Param('phoneId') phoneId: number,
        @Body() phone: UpdateContactPhoneDTO,
    ) {
        return this.contactService.updatePhone(
            userId,
            contactId,
            phoneId,
            phone,
        );
    }

    // delete contact's phone
    @Delete('/:contactId/phones/:phoneId')
    async deletePhone(
        @UserId() userId: number,
        @Param('contactId') contactId: number,
        @Param('phoneId') phoneId: number,
    ) {
        return this.contactService.deletePhone(userId, contactId, phoneId);
    }
}
