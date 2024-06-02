// decorators
import {
    ArrayMaxSize,
    ArrayMinSize,
    ArrayNotEmpty,
    IsBoolean,
    IsDateString,
    IsEmail,
    IsOptional,
    IsString,
    Length,
} from 'class-validator';
import { CreateContactPhoneDTO } from './create-contact-phone.dto';

export class CreateContactDTO {
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

    @ArrayMaxSize(3)
    @ArrayMinSize(1)
    @ArrayNotEmpty()
    phones: CreateContactPhoneDTO[];
}
