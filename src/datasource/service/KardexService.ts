import datasource from '../datasource';
import { KardexHead } from '../model/KardexHead';
import { Product } from '../model/Product';
import { Client } from '../model/Client';
import { Between, FindOptionsWhere, Repository } from 'typeorm';
import ManagedException from '~~/exceptions/ManagedException';

interface IBeetweenDate {
    start: string;
    end: string;
}

export default class KardexService {
    constructor(private kardexHeadRepo: Repository<KardexHead> = datasource.getRepository(KardexHead)) {}

    async findById(id: number): Promise<KardexHead> {
        if (!id) throw new ManagedException('Code is required');
        let kardexHead = await this.kardexHeadRepo
        .findOne({ where:{id}, relations:{body:{product:true},to:true,created_by:true} });

        if (!kardexHead) throw new ManagedException('Movement not found');
        return kardexHead;
    }

    async findAll(between?: IBeetweenDate ): Promise<KardexHead[]> {
        let where: FindOptionsWhere<KardexHead> = {}
        if(between) where.created_at = Between(between.start, between.end)
        
        return await this.kardexHeadRepo
        .find({where, relations:{to:true,created_by:true,body:true} });
    }

    async findByUser(username: string, between: IBeetweenDate): Promise<KardexHead[]> {
        if (!username) throw new ManagedException('User is required');

        let where : FindOptionsWhere<KardexHead> = {created_by:{username}}
        if(between) where.created_at = Between(between.start, between.end)
        
        let kardexHead = await this.kardexHeadRepo
        .find({ where, relations:{to:true,created_by:true} });
        if (!kardexHead) throw new ManagedException('Movement not found');

        return kardexHead;
    }

    

    async findByClient(client: Client,between: IBeetweenDate): Promise<KardexHead[]> {
        if (!client) throw new ManagedException('Client is required');
        let where: FindOptionsWhere<KardexHead> = {to:{id:client.id}}
        if(between) where.created_at =  Between(between.start, between.end)
        let kardexHead = await this.kardexHeadRepo
        .find({ where, relations:{body:{product:true},to:true,created_by:true} });

        return kardexHead;
    }

    

    public save = (kardex: KardexHead) => new Promise<KardexHead>((resolve, reject) => {
        if (!kardex.created_by) throw new ManagedException('User is required');
        if (kardex.body.length === 0) throw new ManagedException('There are no products in the movement');
        if (!kardex.type) throw new ManagedException('Type is required');

        datasource.transaction(async (manager) => {
            for(let det of kardex.body){
                let product = await manager.findOneBy(Product,{code: det.product.code});
                if (!product) throw new ManagedException('Product not found');
                if(kardex.type === 'IN') product.stock += det.quantity;
                else product.stock -= det.quantity;
            }
            resolve(await manager.save(kardex));
        })
    });

    async delete(id: number): Promise<void> {
        if (!id) throw new ManagedException('Id is required');
        let kardexHead = await this.kardexHeadRepo.findOneBy({ id });
        if (!kardexHead) throw new ManagedException('Movement not found');
        await this.kardexHeadRepo.remove(kardexHead);
    }
}