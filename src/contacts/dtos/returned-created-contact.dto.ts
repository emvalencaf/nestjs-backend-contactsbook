import {
    IsBoolean,
    IsDateString,
    IsEmail,
    IsOptional,
    IsString,
    Length,
} from 'class-validator';
import { CreateContactPhoneDTO } from './create-contact-phone.dto';

export class ReturnedCreatedContactDTO {
    @IsString()
    @Length(3, 45)
    firstName: string;
    @IsString()
    @Length(3, 45)
    lastName: string;
    @IsEmail()
    email: string;
    @IsDateString()
    @IsOptional()
    birthday?: string;
    @IsBoolean()
    @IsOptional()
    isFavorite?: boolean;

    phones: CreateContactPhoneDTO[];

    constructor(contact: any[]) {
        this.firstName = contact[0]?.contact_first_name;
        this.lastName = contact[0]?.contact_last_name;
        this.birthday = contact[0]?.contact_birthday;
        this.email = contact[0]?.contact_email;
        this.isFavorite = Boolean(contact[0]?.contact_is_favorite);
        this.phones = contact.map((contact) => {
            return {
                id: contact.phone_id,
                number: contact.phone_number,
                codeArea: contact.phone_code_area,
                isWhatsapp: Boolean(contact.phone_is_whatsapp),
                isTelegram: Boolean(contact.phone_is_telegram),
            };
        });
    }
}
