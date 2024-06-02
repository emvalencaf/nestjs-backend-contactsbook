// decorators
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// typeorms
import { DataSource, Repository } from 'typeorm';

// dtos
import { CreateContactPhoneDTO } from './dtos/create-contact-phone.dto';
import { CreateContactDTO } from './dtos/create-contact.dto';

// entities
import { ContactEntity } from './entities/contact.entity';
import { ContactPhoneEntity } from './entities/contact-phone.entity';
import { UpdateContactPhoneDTO } from './dtos/update-contact-phone.dto';
import { UpdateContactDTO } from './dtos/update-contact.dto';

@Injectable()
export class ContactService {
    constructor(
        private readonly dataSourceRepository: DataSource,
        @InjectRepository(ContactEntity)
        private readonly contactRepository: Repository<ContactEntity>,
        @InjectRepository(ContactPhoneEntity)
        private readonly contactPhoneRepository: Repository<ContactPhoneEntity>,
    ) {}

    // create a new contact
    async createContact(userId: number, contact: CreateContactDTO) {
        const queryRunner = this.dataSourceRepository.createQueryRunner();
        const queryResult = await queryRunner.query(
            'CALL insert_new_contact(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                contact.firstName,
                contact.lastName,
                contact.email,
                contact.birthday,
                contact.isFavorite,
                userId,
                contact.phones[0].number,
                contact.phones[0].codeArea,
                contact.phones[0].isWhatsapp,
                contact.phones[0].isTelegram,
                contact.phones[1]?.number || null,
                contact.phones[1]?.codeArea || null,
                contact.phones[1]?.isWhatsapp || null,
                contact.phones[1]?.isTelegram || null,
                contact.phones[2]?.number || null,
                contact.phones[2]?.codeArea || null,
                contact.phones[2]?.isWhatsapp || null,
                contact.phones[2]?.isTelegram || null,
            ],
        );

        console.log('[server]: user created!');

        return queryResult;
    }

    // update a contact
    async updateContact(
        userId: number,
        contactId: number,
        contact: UpdateContactDTO,
    ) {
        return this.contactRepository.update(
            { id: contactId, user: { id: userId } },
            { ...contact },
        );
    }

    // delete a contact
    async deleteContact(userId: number, contactId: number) {
        return this.contactRepository.delete({
            id: contactId,
            user: { id: userId },
        });
    }

    // get all user's contacts
    async getAllContactsFromUser(
        userId: number,
        showPhones: boolean = true,
    ): Promise<ContactEntity[]> {
        return this.contactRepository.find({
            where: { user: { id: userId } },
            relations: { phones: showPhones },
        });
    }

    // create a new contact's phone
    async createPhone(
        userId: number,
        contactId: number,
        phone: CreateContactPhoneDTO,
    ) {
        const contact = await this.contactRepository.findOne({
            where: { id: contactId, user: { id: userId } },
            relations: {
                user: true,
            },
        });

        const newPhone = await this.contactPhoneRepository.create(phone);
        newPhone.contact = contact;

        return this.contactPhoneRepository.save(newPhone);
    }

    // get all phones from a contact
    async getAllPhonesFromContact(
        userId: number,
        contactId: number,
    ): Promise<ContactPhoneEntity[]> {
        return this.contactPhoneRepository.find({
            where: { contact: { id: contactId, user: { id: userId } } },
        });
    }

    // update a contact's phone
    async updatePhone(
        userId: number,
        contactId: number,
        phoneId: number,
        phone: UpdateContactPhoneDTO,
    ) {
        return this.contactPhoneRepository.update(
            {
                id: phoneId,
                contact: { id: contactId, user: { id: userId } },
            },
            { ...phone },
        );
        /*
        const old = await this.contactPhoneRepository
            .createQueryBuilder('contactphones')
            .innerJoin('contactphones.contact', 'contacts')
            .innerJoin('contacts.user', 'users')
            .where('contactphones.id = :phoneId', { phoneId })
            .andWhere('contacts.id = :contactId', { contactId })
            .andWhere('users.id = :userId', { userId })
            .getOne();
        return this.contactPhoneRepository.save({ ...old, ...phone });*/
        /*
        return this.contactPhoneRepository
            .createQueryBuilder('contactphones')
            .update()
            .set({ ...phone })
            .where(async (qb) => {
                const subQuery = await qb
                    .select('contactphones.id')
                    .innerJoin('contactphones.contact', 'contacts')
                    .innerJoin('contacts.user', 'users')
                    .where('contactphones.id = :phoneId', { phoneId })
                    .andWhere('contacts.id = :contactId', { contactId })
                    .andWhere('users.id = :userId', { userId })
                    .getOne();
                return `contactphones.id IN ${subQuery}`;
            });*/
        /*
        const result = await this.contactPhoneRepository
            .createQueryBuilder()
            .update(ContactPhoneEntity)
            .set({
                number: phone.number,
                codeArea: phone.codeArea,
                isWhatsapp: phone.isWhatsapp,
                isTelegram: phone.isTelegram,
            })
            .where((qb) => {
                const subQuery = qb
                    .select('contactphones.id')
                    .from(ContactPhoneEntity, 'contactphones')
                    .innerJoin('contactphones.contact', 'contact')
                    .where('contactphones.id = :phoneId', { phoneId })
                    .andWhere('contact.id = :contactId', { contactId })
                    .getQuery();
                return `contactPhone.id IN ${subQuery}`;
            })
            .setParameters({ phoneId, contactId, userId })
            .execute();

        if (result.affected === 0) {
            throw new Error(
                'ContactPhone not found or does not belong to the specified contact/user',
            );
        }
        return result;*/
    }

    // delete a contact's phone
    async deletePhone(userId: number, contactId: number, phoneId: number) {
        return this.contactPhoneRepository.delete({
            id: phoneId,
            contact: { id: contactId, user: { id: userId } },
        });
    }
}
