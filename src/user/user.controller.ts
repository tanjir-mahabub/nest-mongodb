import mongoose from 'mongoose';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() creatUserDto: CreateUserDto) {
    console.log(creatUserDto);
    return this.userService.createUser(creatUserDto);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  //user/:id
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('User not found', 404);
    const findUser = await this.userService.getUserById(id);
    if (!findUser) throw new HttpException('Invalid ID', 400);
    return findUser;
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('User not found', 404);
    const deleteUser = await this.userService.deleteUser(id);
    if (!deleteUser) throw new HttpException('User Not Found', 404);
    return;
  }
}
