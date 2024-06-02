// decorators
import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { Public } from '../decorators/isPublic.decorator';

// services
import { AuthService } from './auth.service';
import { AuthSignInDTO } from './dtos/auth-sign-in.dto';
import { ReturnedAuthSignInDTO } from './dtos/returned-auth-sign-in.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @UsePipes(ValidationPipe)
    @Post()
    async signIn(
        @Body() signIn: AuthSignInDTO,
    ): Promise<ReturnedAuthSignInDTO> {
        return this.authService.signIn(signIn);
    }
}
