// decorators
import { Injectable, UnauthorizedException } from '@nestjs/common';

// services
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';

// dtos
import { AuthSignInDTO } from './dtos/auth-sign-in.dto';
import { ReturnedAuthSignInDTO } from './dtos/returned-auth-sign-in.dto';
import { AuthSignInPayloadDTO } from './dtos/auth-sigin-in-payload.dto';

// utils
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async signIn(signIn: AuthSignInDTO): Promise<ReturnedAuthSignInDTO> {
        const user = await this.userService.getByUsername(
            signIn.username,
            true,
        );

        const isMatch = await compare(
            signIn.password || '',
            user?.password || '',
        );

        if (!user || !isMatch) {
            throw new UnauthorizedException('Username or password invalid');
        }

        return {
            accessToken: this.jwtService.sign({
                ...new AuthSignInPayloadDTO(user),
            }),
        };
    }
}
