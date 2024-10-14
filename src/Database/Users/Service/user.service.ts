import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entities/user.entity';
import { Repository } from 'typeorm';
import { createUserDTO } from '../DTO/createdUser.dto';
import { NotFoundException } from '@nestjs/common';
import { updateUserDTO } from '../DTO/updateUser.dto';

@Injectable()
export class userService {
  constructor(
    @InjectRepository(User) // Inject repository của User entity để thao tác với cơ sở dữ liệu
    private userRepository: Repository<User>,
  ) {}
  // tao 1 nguoi dung moi

  async create(createUserDTO: createUserDTO): Promise<User> {
    const user = this.userRepository.create(createUserDTO);
    return this.userRepository.save(user); // luu user moi vao csdl
  }

  // lay tat ca nguoi dung

  async findAll(): Promise<User[]> {
    return this.userRepository.find(); // tra ve danh sach nguoi dung
  }

  //tim 1 nguoi theo ID

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } }); // tim nguoi theo id
    if (!user) {
      throw new NotFoundException(`Id${id} nguoi dung khong tim thay`);
    }
    return user;
  }

  // cap nhat nguoi dung

  async update(id: number, updateUserDTO: updateUserDTO): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDTO); // cap nhat cac thuoc tinh tu DTO vao user da tim thay
    return this.userRepository.save(user); // luu thay doi vao csdl
  }

  //xoa nguoi dung
  async remove(id: number): Promise<void> {
    const user = await this.findOne(id); // timf nguoi dung trc khi xoa
    await this.userRepository.remove(user); //xoa nguoi dung khoi csdl
  }
}
