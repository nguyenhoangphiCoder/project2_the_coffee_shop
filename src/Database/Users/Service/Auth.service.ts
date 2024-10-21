import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entities/user.entity';
import { Repository } from 'typeorm';
import { createUserDTO } from '../DTO/createdUser.dto';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { ConstraintMetadata } from 'class-validator/types/metadata/ConstraintMetadata';
import { exitCode } from 'process';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  //ham signUp user
  async signUp(createUserDTO: createUserDTO) {
    const isExist = await this.userRepository.existsBy({
      email: createUserDTO.email,
    });
    if (isExist) {
      throw new BadRequestException('user already exist');
    } else {
      //hashing password
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash(createUserDTO.password, salt);
      const newUser = await this.userRepository.save({
        ...createUserDTO,
        password,
      });
      return plainToInstance(User, newUser);
    }
  }
  //ham sign in
  async signIn(email: string, password: string) {
    const User = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'password'],
    });
    if (!User) {
      throw new BadRequestException('Invalid email or password');
    } else {
      const hashesPassword = User.password;
      const isMatch = await bcrypt.compare(password, hashesPassword);
      if (isMatch) {
        return User;
      } else {
        throw new BadRequestException('Invalid email or password');
      }
    }
  }
}
