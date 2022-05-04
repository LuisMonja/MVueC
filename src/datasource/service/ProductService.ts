import datasource from '../datasource';
import { Product } from '../model/Product';
import { In, Like, Repository } from 'typeorm';
import ManagedException from '~~/exceptions/ManagedException';

export default class ProductService {
    constructor(private productRepo: Repository<Product> = datasource.getRepository(Product)) {}

    async findAll(): Promise<Product[]> {
        return await this.productRepo.find();
    }

    findByCode(code: string[]): Promise<Product[]> ;
    findByCode(code: string): Promise<Product> ;
    async findByCode(code: string | string[]): Promise<Product | Product[]> {
        if (!code) throw new ManagedException('Code is required');
        var product: Product | Product[] | null;
        if(typeof code === 'string'){
            product = await this.productRepo.findOneBy({ code });
        }else{
            product = await this.productRepo.findBy({ code: In(code) });
        }
        if (!product) throw new ManagedException('Product not found');
        return product;
    }

    



    async findLikeDescription(description: string): Promise<Product[]> {
        return await this.productRepo.findBy({ description: Like(`%${description}%`) });
    }

    async save(product: Product): Promise<Product> {
        if (!product.code) throw new ManagedException('Code is required');
        if (!product.description) throw new ManagedException('Description is required');
        if (!product.default_price) throw new ManagedException('Price is required');
        if (!product.default_cost) throw new ManagedException('Cost is required');
        if (!product.stock_unit) throw new ManagedException('Stock unit is required');
        return await this.productRepo.save(product);
    }

    async delete(code: string): Promise<void> {
        if (!code) throw new ManagedException('Code is required');
        let product = await this.productRepo.findOneBy({ code });
        if (!product) throw new ManagedException('Product not found');
        await this.productRepo.remove(product);
    }
}