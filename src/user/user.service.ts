import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/schema/User.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    const validation = await newUser.validate();
    if (validation !== null && validation !== undefined) {
      throw new HttpException('Invalid input', 400);
    }

    return newUser.save();
  }

  getUsers() {
    return this.userModel.find();
  }

  getUserById(id: string) {
    return this.userModel.findById(id);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
