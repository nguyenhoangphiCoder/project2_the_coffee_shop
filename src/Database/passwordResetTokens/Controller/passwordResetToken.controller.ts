import {
  Body,
  Controller,
  Post,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { passwordResetTokenService } from '../Service/passwordResetTokens.service';
import { ResetPasswordDTO } from '../DTO/createPasswordResetTokens.dto';
import { IsEmail } from 'class-validator';

// DTO for validating email input
class EmailDTO {
  @IsEmail()
  email: string;
}

@Controller('password_reset_tokens')
export class passwordResetTokenController {
  constructor(
    private readonly passwordResetTokenService: passwordResetTokenService,
  ) {}

  // API gửi email tạo token đặt lại mật khẩu
  @Post('send')
  async createAndSend(@Body() emailDTO: EmailDTO) {
    const { email } = emailDTO;

    try {
      // Create and send reset token
      return await this.passwordResetTokenService.createAndSendToken(email);
    } catch (error) {
      throw new HttpException(
        'Có lỗi xảy ra khi gửi yêu cầu đặt lại mật khẩu.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // API đặt lại mật khẩu
  @Put()
  async resetPassword(@Body() resetPasswordDTO: ResetPasswordDTO) {
    const { token, new_password } = resetPasswordDTO;

    try {
      const isReset = await this.passwordResetTokenService.resetPassword(
        token,
        new_password,
      );

      if (!isReset) {
        throw new HttpException(
          'Token không hợp lệ hoặc đã hết hạn.',
          HttpStatus.BAD_REQUEST,
        );
      }

      return { message: 'Mật khẩu đã được đặt lại thành công.' };
    } catch (error) {
      throw new HttpException(
        'Có lỗi xảy ra khi đặt lại mật khẩu.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
