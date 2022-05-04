import datasource from '../datasource';
import {User} from '../model/User';
import { Like, Repository } from 'typeorm';
import ManagedException from '../../exceptions/ManagedException';

export default class UserService {
    
    constructor(private userRepo:Repository<User> = datasource.getRepository(User)){}

    async findAll():Promise<User[]>{
        return await this.userRepo.find();
    }

    async findByUsername(username: string):Promise<User>{
        if(!username) throw new ManagedException('Username is required');
        let user = await this.userRepo.findOneBy({username});
        if(!user) throw new ManagedException('User not found');
        return user;
    }

    async findLikeUsername(username: string):Promise<User>{
        if(!username) throw new ManagedException('Username is required');
        let user = await this.userRepo.findOneBy({username: Like(`%${username}%`)});
        if(!user) throw new ManagedException('User not found');
        return user;
    }

    async save(user:User):Promise<User>{
        if(!user.username) throw new ManagedException('Username is required');
        if(!user.getPassword()) throw new ManagedException('Password is required');
        if(!user.name) throw new ManagedException('Name is required');
        return await this.userRepo.save(user);
    }

    async delete(username:string): Promise<void>{
        if(!username) throw new ManagedException('Username is required');
        let user = await this.userRepo.findOneBy({username});
        if(!user) throw new ManagedException('User not found');
        await this.userRepo.remove(user);
    }

    
}

