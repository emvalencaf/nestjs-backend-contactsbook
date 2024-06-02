export class ReturnedCreatedUserDTO {
    id: number;
    username: string;
    email: string;
    profile: {
        firstName: string;
        lastName: string;
        birthday: string;
    };

    constructor(user: any) {
        this.id = user.user_id;
        this.username = user.user_username;
        this.email = user.user_email;
        this.profile = {
            firstName: user.user_first_name,
            lastName: user.user_last_name,
            birthday: user.user_birthday,
        };
    }
}
