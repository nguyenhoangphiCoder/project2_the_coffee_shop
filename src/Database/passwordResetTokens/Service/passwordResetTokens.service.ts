import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { passwordResetTokens } from 'src/Entities/passwordResetTokens.entity';
import { Repository } from 'typeorm';
import { CreatePassWordResetTokensDTO } from '../DTO/createPasswordResetTokens.dto';
import { User } from 'src/Entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as dayjs from 'dayjs';

@Injectable()
export class passwordResetTokenService {
  constructor(
    @InjectRepository(passwordResetTokens)
    private readonly passwordResetTokenRepository: Repository<passwordResetTokens>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Tạo token đặt lại mật khẩu
  async create(
    createPassWordResetTokensDTO: CreatePassWordResetTokensDTO,
  ): Promise<passwordResetTokens> {
    try {
      // Tìm kiếm người dùng theo user_id
      const user = await this.userRepository.findOne({
        where: { id: createPassWordResetTokensDTO.user_id },
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const passwordResetToken = this.passwordResetTokenRepository.create({
        user,
        token: createPassWordResetTokensDTO.token,
        expired_at: createPassWordResetTokensDTO.expired_at,
      });

      return await this.passwordResetTokenRepository.save(passwordResetToken);
    } catch (error) {
      throw new HttpException(
        'Unable to create password reset token: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Tìm kiếm token
  async findByToken(token: string): Promise<passwordResetTokens | null> {
    return this.passwordResetTokenRepository.findOne({
      where: { token },
      relations: ['user'],
    });
  }

  // Đặt lại mật khẩu
  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    const resetToken = await this.findByToken(token);

    if (!resetToken || dayjs(resetToken.expired_at).isBefore(dayjs())) {
      return false; // Token không hợp lệ hoặc đã hết hạn
    }

    // Cập nhật mật khẩu người dùng
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    resetToken.user.password = hashedPassword;

    await this.userRepository.save(resetToken.user);

    // Xóa token sau khi sử dụng
    await this.passwordResetTokenRepository.delete({ id: resetToken.id });

    return true;
  }

  // Xóa token khi đã sử dụng hoặc hết hạn
  async remove(id: number): Promise<void> {
    await this.passwordResetTokenRepository.delete(id);
  }
}
