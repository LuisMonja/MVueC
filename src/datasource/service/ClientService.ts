import datasource from '../datasource';
import { Client } from '../model/Client';
import { Like, Repository } from 'typeorm';
import ManagedException from '~~/exceptions/ManagedException';

export default class ClientService {
    constructor(private clientRepo: Repository<Client> = datasource.getRepository(Client)) {}

    async findAll(): Promise<Client[]> {
        return await this.clientRepo.find();
    }

    async findByName(name: string): Promise<Client[]> {
        return await this.clientRepo.findBy({ name: Like(`%${name}%`) });
    }

    async findById(id: number): Promise<Client> {
        let client = await this.clientRepo.findOneBy({id});
        if (!client) throw new ManagedException('Client not found');
        return client;
    }

    async save(client: Client): Promise<Client> {
        if (!client.name) throw new ManagedException('Name is required');
        return await this.clientRepo.save(client);
    }

}