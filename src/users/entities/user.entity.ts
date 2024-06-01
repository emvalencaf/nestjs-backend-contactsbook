// decorators
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserProfileEntity } from './user-profile.entity';

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn('increment', { name: 'user_id', unsigned: true })
    id: number;

    @Column({
        name: 'user_username',
        unique: true,
        nullable: false,
        type: 'varchar',
    })
    username: string;

    @Column({ name: 'user_password', nullable: false, type: 'varchar' })
    password: string;

    @Column({
        name: 'user_email',
        unique: true,
        nullable: false,
        type: 'varchar',
    })
    email: string;

    @OneToOne(() => UserProfileEntity, (userProfile) => userProfile.user, {
        cascade: true,
    })
    profile: UserProfileEntity;
}
