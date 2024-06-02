// entities
import { UserProfileEntity } from '../entities/user-profile.entity';
import { UserEntity } from '../entities/user.entity';

export class ReturnedUserDTO {
    id: number;
    username: string;
    email: string;
    profile?: UserProfileEntity;
    constructor(user: UserEntity) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.profile = user.profile ? user.profile : undefined;
    }
}
