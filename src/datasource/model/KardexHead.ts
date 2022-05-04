import { Entity, Column, OneToMany, ManyToOne } from "typeorm";
import { User } from "./User";
import { KardexBody } from "./KardexBody";
import { Client } from "./Client";

@Entity()
export class KardexHead {
    
    constructor(type: 'IN' | 'OUT', 
    concept: string, 
     
    body: KardexBody[],
    created_by: User,
    to?: Client, 
    observations: string = '',
    status: string = 'ACTIVE'){
        this.type = type;
        this.concept = concept;
        this.to = to;
        this.body = body;
        this.created_by = created_by;
        this.observations = observations;
        this.status = status;
    }

    @Column({ type: "int", primary: true, generated: true })
    id: number;

    @Column({ type: "enum", enum: ['IN','OUT'] })
    type: string;

    @Column({ type: "varchar", length: 30 })
    concept: string;

    @Column({ type: "text"})
    observations: string;

    @Column({ type: "enum", enum:['ACTIVE','CANCELED'] })
    status: string;

    @ManyToOne(type => Client, client => client.outs,{ cascade: true, nullable:true })
    to?: Client;
    
    @OneToMany(type => KardexBody, kardexBody => kardexBody.head, {cascade: true})
    body: KardexBody[];

    @ManyToOne(type => User, user => user.clients)
    created_by: User;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    created_at: string;

}