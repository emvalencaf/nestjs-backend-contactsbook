// decorators
import { IsDateString, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserProfileDTO {
    @IsString()
    @IsOptional()
    @Length(3, 45)
    firstName?: string;

    @IsString()
    @IsOptional()
    @Length(3, 45)
    lastName?: string;

    @IsDateString()
    @IsOptional()
    birthday?: string;
}
