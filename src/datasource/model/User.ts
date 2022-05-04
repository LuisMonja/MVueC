import { Column, Entity, OneToMany } from "typeorm";
import { KardexHead } from "./KardexHead";
import { Client } from "./Client";
import { Product } from "./Product";
import bcrypt from "bcrypt";


@Entity()
export class User {

    constructor(name: string, username: string, authorities: string = '{}') {
        this.name = name;
        this.username = username;
        this.authorities = authorities;
    }

    comparePassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password);
    }

    setPassword(password: string): void {
        this.password = bcrypt.hashSync(password, 10);
    }

    getPassword(): string {
        return this.password;
    }

    @Column({ type: "varchar", length:25,primary: true })
    username: string;

    @Column({ type: "varchar", length:55 })
    name: string;

    @Column({ type: "varchar", length:100 })
    private password: string;

    @Column({ type: "text", default: '{}' })
    authorities: string;

    @OneToMany(type => KardexHead, kardexHead => kardexHead.created_by)
    kardexHead: KardexHead[];

    @OneToMany(type => Client, client => client.created_by)
    clients: Client[];

    @OneToMany(type => Product, product => product.created_by)
    products: Product[];


}