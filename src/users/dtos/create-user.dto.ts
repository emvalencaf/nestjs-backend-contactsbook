// decorators
import {
    IsDateString,
    IsEmail,
    IsString,
    IsStrongPassword,
    Length,
} from 'class-validator';

export class CreateUserDTO {
    @IsString()
    @Length(3, 45)
    username: string;
    @IsEmail()
    email: string;
    @IsStrongPassword()
    @Length(3, 45)
    password: string;
    @IsString()
    firstName: string;
    @IsString()
    lastName: string;
    @IsDateString()
    birthday: string;
}
