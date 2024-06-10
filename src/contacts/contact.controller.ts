// decorators
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { UserId } from '../decorators/user-id.decorator';

// services
import { ContactService } from './contact.service';

// dtos
import { CreateContactDTO } from './dtos/create-contact.dto';
import { UpdateContactPhoneDTO } from './dtos/update-contact-phone.dto';
import { CreateContactPhoneDTO } from './dtos/create-contact-phone.dto';
import { UpdateContactDTO } from './dtos/update-contact.dto';
import { ReturnedCreatedContactDTO } from './dtos/returned-created-contact.dto';

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
            const response = await this.contactService.createContact(
                userId,
                contact,
            );

            return {
                statusCode: 200,
                result: new ReturnedCreatedContactDTO(response[0]),
                message: 'Created contact.',
            };
        } catch (err) {
            return {
                message: err?.driverError?.sqlMessage || 'Internal Error',
                statusCode: (err?.driverError?.sqlMessage && 400) || 500,
            };
        }
    }

    @Get('/:contactId')
    async getContactById(
        @Param('contactId') contactId: number,
        @UserId() userId: number,
        @Query('showPhones') showPhones: boolean = true,
    ) {
        try {
            const contact = await this.contactService.getById(
                contactId,
                userId,
                showPhones,
            );
            if (!contact)
                return {
                    result: [],
                    message: 'No contact was found it.',
                    statusCode: 404,
                };
            return {
                result: contact,
                message: 'Contact fetched.',
                statusCode: 200,
            };
        } catch (err) {
            return {
                message: err?.driverError?.sqlMessage || 'Internal Error',
                statusCode: (err?.driverError?.sqlMessage && 400) || 500,
            };
        }
    }
    // get all user's contacts
    @Get()
    async getAllContactsFromUser(
        @UserId() userId: number,
        @Query('showPhones') showPhones: boolean = true,
        @Query('filterByFavorites') filterByFavorites: boolean = false,
    ) {
        try {
            const contacts = await this.contactService.getAllContactsFromUser(
                userId,
                showPhones,
                filterByFavorites,
            );

            if (!contacts)
                return {
                    result: [],
                    message: 'No contacts was found it.',
                    statusCode: 404,
                };
            return {
                result: contacts,
                message: 'Contacts fetched.',
                statusCode: 200,
            };
        } catch (err) {
            return {
                message: err?.driverError?.sqlMessage || 'Internal Error',
                statusCode: (err?.driverError?.sqlMessage && 400) || 500,
            };
        }
    }

    // update an user's contact
    @Patch('/:contactId')
    async updateContact(
        @UserId() userId: number,
        @Param('contactId') contactId: number,
        @Body() contact: UpdateContactDTO,
    ) {
        try {
            return {
                result: await this.contactService.updateContact(
                    userId,
                    contactId,
                    contact,
                ),
                message: 'contact was updated.',
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

    @Delete('/:contactId')
    async deleteContact(
        @UserId() userId: number,
        @Param('contactId') contactId: number,
    ) {
        try {
            return {
                result: await this.contactService.deleteContact(
                    userId,
                    contactId,
                ),
                message: 'Deleted contact.',
                status: 200,
            };
        } catch (err) {
            console.log(err);
            return {
                mesage: err?.driverError?.sqlMessage || 'Internal Error',
                statusCode: (err?.driverError?.sqlMessage && 400) || 500,
            };
        }
    }
    // create a new contact's phone
    @Post('/:contactId/phones')
    async createPhone(
        @UserId() userId: number,
        @Param('contactId') contactId: number,
        @Body() phone: CreateContactPhoneDTO,
    ) {
        try {
            const result = await this.contactService.createPhone(
                userId,
                contactId,
                phone,
            );
            return {
                result,
                message: 'Created phone.',
                status: 201,
            };
        } catch (err) {
            console.log(err);
            return {
                message: err?.driverError?.sqlMessage || 'Internal Error',
                statusCode: (err?.driverError?.sqlMessage && 400) || 500,
            };
        }
    }

    // get all phones from an contact
    @Get('/:contactId/phones')
    async getAllPhonesFromContact(
        @UserId() userId: number,
        @Param('contactId') contactId: number,
    ) {
        try {
            const phones = await this.contactService.getAllPhonesFromContact(
                userId,
                contactId,
            );

            if (!phones || phones.length === 0)
                return {
                    result: [],
                    message: 'No phones found it',
                    statusCode: 404,
                };

            return {
                result: phones,
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

    // partial update contact's phone
    @Patch('/:contactId/phones/:phoneId')
    async updatePhone(
        @UserId() userId: number,
        @Param('contactId') contactId: number,
        @Param('phoneId') phoneId: number,
        @Body() phone: UpdateContactPhoneDTO,
    ) {
        try {
            return {
                result: await this.contactService.updatePhone(
                    userId,
                    contactId,
                    phoneId,
                    phone,
                ),
                message: 'Phone updated',
                statusCode: 200,
            };
        } catch (err) {
            console.log(err);
            return {
                result: err?.driverError?.sqlMessage || 'Internal Error',
                statusCode: (err?.driverError?.sqlMessage && 400) || 500,
            };
        }
    }

    // delete contact's phone
    @Delete('/:contactId/phones/:phoneId')
    async deletePhone(
        @UserId() userId: number,
        @Param('contactId') contactId: number,
        @Param('phoneId') phoneId: number,
    ) {
        try {
            return {
                result: await this.contactService.deletePhone(
                    userId,
                    contactId,
                    phoneId,
                ),
                message: 'Phone was deleted.',
                statusCode: 200,
            };
        } catch (err) {
            console.log(err);
            return {
                result: err?.driverError?.sqlMessage || 'Internal Error',
                statusCode: (err?.driverError?.sqlMessage && 400) || 500,
            };
        }
    }
}
