import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entities/user.entity';
import { Repository } from 'typeorm';
import { createUserDTO } from '../DTO/createdUser.dto';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
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
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash(createUserDTO.password, salt);

      const newUser = await this.userRepository.save({
        ...createUserDTO,
        password,
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
    const isMatch = await bcrypt.compare(password, storedPassword);

    if (isMatch) {
      return user;
    } else {
      throw new BadRequestException('Invalid email or password');
    }
  }
}
