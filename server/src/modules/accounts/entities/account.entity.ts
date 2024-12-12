import { Portfolio } from 'src/modules/portfolios/enities/portfolio.entity';
import { Role } from 'src/modules/privileges/entities/role.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import {
    ApiProperty,
    ApiSchema,
} from '@nestjs/swagger';

import { AccountAuth } from './account-auth.entity';

@ApiSchema({ name: 'AccountDto' })
@Entity()
export class Account {
    constructor(account: Partial<Account>) {
        Object.assign(this, account);
    }

    @PrimaryGeneratedColumn()
    @ApiProperty()
        id: number;

    @Column({ unique: true })
    @ApiProperty({ description: 'Unique email' })
        email: string;

    @Column()
    @ApiProperty()
        name: string;

    @Column({ nullable: true })
    @ApiProperty({ description: 'Account avatar image url' })
        avatar: string;

    @Column({ default: true })
    @ApiProperty({ description: 'Account enable status' })
        enabled: boolean;

    @Column({
        nullable: true, default: null, 
    })
    @ApiProperty()
        last_login_at: Date;

    @CreateDateColumn()
    @ApiProperty()
        create_at: Date;

    @UpdateDateColumn({
        nullable: true, default: null, 
    })
    @ApiProperty()
        update_at: Date;

    @ManyToMany(() => Role, (role) => role.accounts, { cascade: true })
    @JoinTable({ name: 'account_role' })
    @ApiProperty({ type: [Role] })
        roles: Role[];

    @OneToMany(() => AccountAuth, (auth) => auth.account, { cascade: true })
        auths: AccountAuth[];

    @OneToMany(() => Portfolio, (portfolio) => portfolio.account, { cascade: true })
        portfolios: Portfolio[];
}

