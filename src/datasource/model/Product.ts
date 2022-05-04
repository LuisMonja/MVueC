import { Entity, Column, OneToMany, ManyToOne } from "typeorm";
import { KardexBody } from "./KardexBody";
import { User } from "./User";

@Entity()
export class Product {

    constructor(code: string, 
        description: string, 
        cost: number, 
        price: number,
        status: 'ACTIVE' | 'CANCELED' | 'PAUSED' = 'ACTIVE',
        stock_unit: string = 'PZA', 
        stock: number = 0, 
        ) {
        this.code = code;
        this.description = description;
        this.default_price = price;
        this.default_cost = cost;
        this.stock_unit = stock_unit;
        this.stock = stock;
        this.status = status;
    }

    @Column({type: "varchar",length:'12', primary:true})
    code: string;

    @Column({type: "varchar",length:'25'})
    description: string;

    @Column({type: "decimal", precision: 10, scale: 2})
    default_cost: number;

    @Column({type: "decimal", precision: 10, scale: 2})
    default_price: number;

    @Column({type: "varchar", length:7, default: 0})
    stock_unit: string;

    @Column({type: "int", default: 0})
    stock: number;

    @Column({type: "enum", enum:['ACTIVE','PAUSED','CANCELED']})
    status: string;

    @OneToMany(type => KardexBody, kardexBody => kardexBody.product,{createForeignKeyConstraints:false})
    kardex: KardexBody[];

    @Column({type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;

    @ManyToOne(type => User, user => user.products)
    created_by: User;
}