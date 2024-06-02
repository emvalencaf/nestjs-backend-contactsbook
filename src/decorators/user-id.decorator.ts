import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { AuthSignInPayloadDTO } from '../auth/dtos/auth-sigin-in-payload.dto';
import { authorizationToSignInPayload } from '../utils/base-64-convert.util';

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
    let { authorization } = ctx.switchToHttp().getRequest().headers;

    // get an access token
    authorization = authorization.includes('Bearer')
        ? authorization.split(' ')[1]
        : authorization;

    const signInPayload: AuthSignInPayloadDTO | undefined =
        authorizationToSignInPayload(authorization);

    console.log(signInPayload);

    return signInPayload.id;
});
