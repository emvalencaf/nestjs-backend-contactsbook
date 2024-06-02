import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { ContactPhoneEntity } from './contact-phone.entity';

@Entity('contacts')
export class ContactEntity {
    @PrimaryGeneratedColumn('increment', { name: 'contact_id', unsigned: true })
    id: number;

    @Column({
        name: 'contact_first_name',
        type: 'varchar',
        nullable: false,
        length: 45,
    })
    firstName: string;

    @Column({
        name: 'contact_last_name',
        type: 'varchar',
        nullable: false,
        length: 45,
    })
    lastName: string;

    @Column({
        name: 'contact_email',
        type: 'varchar',
        nullable: false,
        length: 45,
    })
    email: string;

    @Column({ name: 'contact_birthday', nullable: true, type: 'date' })
    birthday?: string;

    @Column({
        name: 'contact_is_favorite',
        nullable: true,
        type: 'boolean',
        default: 'boolean',
    })
    isFavorite: boolean;

    @ManyToOne(() => UserEntity, (user) => user.contacts, { eager: false })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @OneToMany(() => ContactPhoneEntity, (phone) => phone.contact, {
        cascade: true,
    })
    phones: ContactPhoneEntity[];
}
