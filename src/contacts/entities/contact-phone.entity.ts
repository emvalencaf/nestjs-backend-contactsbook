import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ContactEntity } from './contact.entity';

@Entity('contactphones')
export class ContactPhoneEntity {
    @PrimaryGeneratedColumn('increment', { name: 'phone_id', unsigned: true })
    id: number;
    @Column({
        name: 'phone_number',
        nullable: false,
        type: 'varchar',
        length: 9,
    })
    number: string;
    @Column({
        name: 'phone_code_area',
        nullable: false,
        type: 'char',
        length: 2,
    })
    codeArea: string;
    @Column({
        name: 'phone_is_whatsapp',
        nullable: true,
        type: 'boolean',
        default: false,
    })
    isWhatsapp: boolean;
    @Column({
        name: 'phone_is_telegram',
        nullable: true,
        type: 'boolean',
        default: false,
    })
    isTelegram: boolean;
    @ManyToOne(() => ContactEntity, (contact) => contact.phones)
    @JoinColumn({ name: 'contact_id' })
    contact: ContactEntity;
}
