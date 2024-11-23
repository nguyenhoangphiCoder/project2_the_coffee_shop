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

  // Tạo 1 người dùng mới
  async create(createUserDTO: createUserDTO): Promise<User> {
    const user = this.userRepository.create(createUserDTO);
    return this.userRepository.save(user); // Lưu user mới vào cơ sở dữ liệu
  }

  // Lấy tất cả người dùng
  async findAll(): Promise<User[]> {
    return this.userRepository.find(); // Trả về danh sách người dùng
  }

  // Tìm 1 người theo ID
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Id ${id} người dùng không tìm thấy`);
    }
    return user;
  }

  // Tìm người dùng theo email
  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(
        `Người dùng với email ${email} không tìm thấy`,
      );
    }
    return user;
  }

  // Cập nhật người dùng
  async update(id: number, updateUserDTO: updateUserDTO): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDTO); // Cập nhật các thuộc tính từ DTO vào user đã tìm thấy
    return this.userRepository.save(user); // Lưu thay đổi vào cơ sở dữ liệu
  }

  // Xóa người dùng
  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);

    // Xóa các bản ghi franchise có owner là người dùng này
    await this.FranchiseRepository.delete({ owner: user });

    // Sau đó, xóa người dùng
    await this.userRepository.remove(user);
  }

  // Lấy avatar của người dùng
  async getAvatar(userId: number): Promise<string> {
    const user = await this.findOne(userId);
    if (!user.avatar_url) {
      throw new NotFoundException('Người dùng chưa có ảnh đại diện.');
    }
    return user.avatar_url;
  }
}
