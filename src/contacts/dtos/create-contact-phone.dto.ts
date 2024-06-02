import {
    IsBoolean,
    IsNumberString,
    IsOptional,
    IsPhoneNumber,
    Length,
} from 'class-validator';

export class CreateContactPhoneDTO {
    @IsPhoneNumber('BR')
    @Length(9, 9)
    number: string;
    @IsNumberString()
    @Length(2, 2)
    codeArea: string;
    @IsBoolean()
    @IsOptional()
    isWhatsapp?: boolean;
    @IsBoolean()
    @IsOptional()
    isTelegram?: boolean;
}
