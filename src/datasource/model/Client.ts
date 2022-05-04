import { Entity, OneToMany, Column, ManyToOne } from "typeorm";
import { KardexHead } from "./KardexHead";
import { User } from "./User";

@Entity()
export class Client {

    constructor(name:string, email:string = '', phone:string = '', address:string = '') {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }

    @Column({ type: "int", primary: true, generated: true })
    id: number;

    @Column({ type: "varchar", length: 30 })
    name: string;

    @Column({ type: "varchar", length: 30 })
    phone: string;

    @Column({ type: "varchar", length: 30 })
    email: string;

    @Column({ type: "varchar", length: 30 })
    address: string;

    @OneToMany(type => KardexHead, kardexHead => kardexHead.to)
    outs: KardexHead[];

    @ManyToOne(type => User, user => user.clients)
    created_by: User;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    
}