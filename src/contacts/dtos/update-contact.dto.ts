// decorators
import {
    IsBoolean,
    IsDateString,
    IsEmail,
    IsOptional,
    IsString,
    Length,
} from 'class-validator';

export class UpdateContactDTO {
    @IsString()
    @Length(3, 45)
    @IsOptional()
    firstName: string;
    @IsString()
    @Length(3, 45)
    @IsOptional()
    lastName: string;
    @IsEmail()
    @IsOptional()
    email: string;
    @IsDateString()
    @IsOptional()
    birthday?: string;
    @IsBoolean()
    @IsOptional()
    isFavorite?: boolean;
}
