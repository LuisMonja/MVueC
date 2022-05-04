import { Entity, Column, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { KardexHead } from "./KardexHead";

@Entity()
export class KardexBody {

    constructor(product: Product, quantity: number, price: number) {
        this.product = product;
        this.quantity = quantity;
        this.price = price;
    }

    @Column({ type: "int", primary: true, generated: true })
    id: number;

    @Column({ type: "float" })
    quantity: number;

    @Column({ type: "decimal", scale:2, precision:10 })
    price: number;

    @ManyToOne(type => Product, Product => Product.kardex)
    product: Product

   @ManyToOne(type => KardexHead, kardexHead => kardexHead.body,{createForeignKeyConstraints: false})
    head: KardexHead;
    

}