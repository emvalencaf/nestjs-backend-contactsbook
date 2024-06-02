import { IsString } from 'class-validator';

export class AuthSignInDTO {
    @IsString()
    username: string;
    @IsString()
    password: string;
}
