import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { passwordResetTokens } from 'src/Entities/passwordResetTokens.entity';
import { Repository } from 'typeorm';
import { User } from 'src/Entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as dayjs from 'dayjs';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class passwordResetTokenService {
  constructor(
    @InjectRepository(passwordResetTokens)
    private readonly passwordResetTokenRepository: Repository<passwordResetTokens>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Tạo token đặt lại mật khẩu và gửi email
  async createAndSendToken(userEmail: string): Promise<string> {
    try {
      // Tìm kiếm người dùng theo email
      const user = await this.userRepository.findOne({
        where: { email: userEmail },
      });

      if (!user) {
        throw new HttpException('Email không tồn tại', HttpStatus.NOT_FOUND);
      }

      // Tạo token
      const token = crypto.randomBytes(3).toString('hex');
      const expiredAt = dayjs().add(1, 'hour').toDate();

      // Lưu token vào cơ sở dữ liệu
      const passwordResetToken = this.passwordResetTokenRepository.create({
        user,
        token,
        expired_at: expiredAt,
      });
      await this.passwordResetTokenRepository.save(passwordResetToken);

      // Gửi email
      await this.sendResetEmail(user.email, token);

      return 'Token đặt lại mật khẩu đã được gửi tới email của bạn.';
    } catch (error) {
      console.error(
        'Error occurred while sending reset password request:',
        error,
      );
      throw new HttpException(
        'Có lỗi xảy ra khi gửi yêu cầu đặt lại mật khẩu. Chi tiết: ' +
          error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Gửi email đặt lại mật khẩu
  private async sendResetEmail(email: string, token: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'nguyenhoangphifpt523@gmail.com',
        pass: 'uwgk izeo shuw siru',
      },
    });

    const mailOptions = {
      from: '"The Tech Coffee" <your-email@gmail.com>',
      to: email,
      subject: 'Đặt lại mật khẩu',
      text: `Vui lòng sử dụng mã sau để đặt lại mật khẩu: ${token}`,
      html: `<p>Vui lòng sử dụng mã token sau để đặt lại mật khẩu:</p>
             <p><strong>${token}</strong></p>`,
    };

    try {
      console.log('Sending email to:', email);
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw new HttpException(
        'Không thể gửi email đặt lại mật khẩu. Chi tiết lỗi: ' + error.message,
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
