// decorators
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'userprofile' })
export class UserProfileEntity {
    @PrimaryColumn({ name: 'user_id', nullable: false })
    id: number;
    @Column({ name: 'user_first_name', nullable: false, type: 'varchar' })
    firstName: string;
    @Column({ name: 'user_last_name', nullable: false, type: 'varchar' })
    lastName: string;
    @Column({ name: 'user_birthday', nullable: false, type: 'date' })
    birthday: Date;

    @OneToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;
}
