import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]>{
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User>{
    return this.userModel.findById(id).exec();
  }

  async create(user: User): Promise<User>{
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async update(id: string, user: Partial<User>):Promise<User>{
    return await this.userModel.findByIdAndUpdate(id, user, {new:true}).exec();
  }

  async remove(id: string): Promise<string>{
    await this.userModel.findByIdAndDelete(id).exec();
    return "Record deleted successfully";
  }
}
