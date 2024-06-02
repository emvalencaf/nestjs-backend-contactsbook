import { UserEntity } from '../../users/entities/user.entity';

export class AuthSignInPayloadDTO {
    id: number;

    constructor(user: UserEntity) {
        this.id = user.id;
    }
}
