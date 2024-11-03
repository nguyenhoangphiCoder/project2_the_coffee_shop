import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entities/user.entity';
import { Repository } from 'typeorm';
import { createUserDTO } from '../DTO/createdUser.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Đăng ký người dùng
  async signUp(createUserDTO: createUserDTO) {
    const isExist = await this.userRepository.findOne({
      where: { email: createUserDTO.email },
    });
    if (isExist) {
      throw new BadRequestException('User already exists');
    } else {
      const newUser = await this.userRepository.save({
        ...createUserDTO,
        password: createUserDTO.password, // Không mã hóa mật khẩu
      });
      return plainToInstance(User, newUser);
    }
  }

  // Đăng nhập
  async signIn(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'name', 'avatar_url', 'phone_number', 'password'],
      relations: ['addresses'], // Thêm mối quan hệ với địa chỉ
    });

    if (!user) {
      throw new BadRequestException('Invalid email');
    }

    const storedPassword = user.password;
    if (password === storedPassword) {
      const { password, ...userInfo } = user; // Tách mật khẩu ra
      return { ...userInfo, addresses: user.addresses }; // Trả về thông tin người dùng cùng với địa chỉ
    } else {
      throw new BadRequestException('Invalid password');
    }
  }
}
