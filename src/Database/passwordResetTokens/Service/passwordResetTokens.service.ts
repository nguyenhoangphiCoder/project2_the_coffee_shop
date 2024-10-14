import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { passwordResetTokens } from 'src/Entities/passwordResetTokens.entity';
import { Repository } from 'typeorm';
import { CreatePassWordResetTokensDTO } from '../DTO/createPasswordResetTokens.dto';
import { promises } from 'dns';
import { User } from 'src/Entities/user.entity';

@Injectable()
export class passwordResetTokenService {
  constructor(
    @InjectRepository(passwordResetTokens)
    private readonly passwordResetTokenRepository: Repository<passwordResetTokens>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Thêm dòng này
  ) {}

  // tao 1 token dat lai mk
  async create(
    CreatePassWordResetTokensDTO: CreatePassWordResetTokensDTO,
  ): Promise<passwordResetTokens> {
    try {
      // Tìm kiếm người dùng theo user_id
      const user = await this.userRepository.findOne({
        where: { id: CreatePassWordResetTokensDTO.user_id },
      });
      if (!user) {
        throw new Error('User not found');
      }

      const passwordResetToken = this.passwordResetTokenRepository.create({
        user, // Gán đối tượng User vào thuộc tính user
        token: CreatePassWordResetTokensDTO.token,
        expired_at: CreatePassWordResetTokensDTO.expired_at,
      });

      return await this.passwordResetTokenRepository.save(passwordResetToken);
    } catch (error) {
      throw new Error(
        'Unable to create password reset token: ' + error.message,
      );
    }
  }

  // tim kiem token theo token

  async findByToken(token: string): Promise<passwordResetTokens | null> {
    return this.passwordResetTokenRepository.findOne({ where: { token } }); //tim kiem token dua vao gia tri token
  }

  //xoa token khi da su dung hoac het han
  async remove(id: number): Promise<void> {
    await this.passwordResetTokenRepository.delete(id); //xoa token dua tren id
  }
}
