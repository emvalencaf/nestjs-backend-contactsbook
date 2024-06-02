import { AuthSignInPayloadDTO } from '../auth/dtos/auth-sigin-in-payload.dto';

export const authorizationToSignInPayload = (
    authorization: string,
): AuthSignInPayloadDTO | undefined => {
    const authorizationSplited = authorization.split('.');

    if (authorization.length < 3 || !authorization[1]) return undefined;

    return JSON.parse(
        Buffer.from(authorizationSplited[1], 'base64').toString('ascii'),
    );
};
