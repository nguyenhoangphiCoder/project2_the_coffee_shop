import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entities/user.entity';
import { Repository } from 'typeorm';
import { createUserDTO } from '../DTO/createdUser.dto';
import { NotFoundException } from '@nestjs/common';
import { updateUserDTO } from '../DTO/updateUser.dto';
import { Franchises } from 'src/Entities/franchises.entity';

@Injectable()
export class userService {
  constructor(
    @InjectRepository(User) // Inject repository của User entity để thao tác với cơ sở dữ liệu
    private userRepository: Repository<User>,
    @InjectRepository(Franchises)
    private FranchiseRepository: Repository<Franchises>,
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
  async findById(user_id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id: user_id },
    });
  }
  // cap nhat nguoi dung

  async update(id: number, updateUserDTO: updateUserDTO): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDTO); // cap nhat cac thuoc tinh tu DTO vao user da tim thay
    return this.userRepository.save(user); // luu thay doi vao csdl
  }

  //xoa nguoi dung
  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);

    // Xóa các bản ghi franchise có owner là người dùng này
    await this.FranchiseRepository.delete({ owner: user });

    // Sau đó, xóa người dùng
    await this.userRepository.remove(user);
  }
  async getAvatar(userId: number): Promise<string> {
    const user = await this.findOne(userId);
    if (!user.avatar_url) {
      throw new NotFoundException('Người dùng chưa có ảnh đại diện.');
    }
    return user.avatar_url;
  }
}
