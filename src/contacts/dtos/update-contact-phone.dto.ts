import {
    IsBoolean,
    IsNumberString,
    IsOptional,
    IsPhoneNumber,
    Length,
} from 'class-validator';

export class UpdateContactPhoneDTO {
    @IsPhoneNumber('BR')
    @Length(9, 9)
    @IsOptional()
    number?: string;
    @IsNumberString()
    @Length(2, 2)
    @IsOptional()
    codeArea?: string;
    @IsBoolean()
    @IsOptional()
    isWhatsapp?: boolean;
    @IsBoolean()
    @IsOptional()
    isTelegram?: boolean;
}
