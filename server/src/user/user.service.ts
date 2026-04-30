import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
     @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    create(name:string){
        const user= this.userRepository.create({name});
        return this.userRepository.save(user);
    }

    findAll(){
        return this.userRepository.find();
    }

    findOne(id: number){
        return this.userRepository.findOne({
            where: {id},
        })
    }

    update(id: number, name:string){
        return this.userRepository.update(
            {id},
            {name},
        )
    }

    remove(id: number){
        return this.userRepository.delete({id});
    }
}
