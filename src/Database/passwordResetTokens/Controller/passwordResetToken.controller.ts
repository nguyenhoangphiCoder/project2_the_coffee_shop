import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { passwordResetTokenService } from '../Service/passwordResetTokens.service';
import {
  CreatePassWordResetTokensDTO,
  ResetPasswordDTO,
} from '../DTO/createPasswordResetTokens.dto';

@Controller('password_reset_tokens')
export class passwordResetTokenController {
  constructor(
    private readonly passwordResetTokenService: passwordResetTokenService,
  ) {}

  // API tạo token đặt lại mật khẩu
  @Post()
  async create(
    @Body() createPassWordResetTokensDTO: CreatePassWordResetTokensDTO,
  ) {
    return this.passwordResetTokenService.create(createPassWordResetTokensDTO);
  }

  // API đặt lại mật khẩu
  @Put()
  async resetPassword(@Body() resetPasswordDTO: ResetPasswordDTO) {
    const { token, new_password } = resetPasswordDTO;

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
  }

  // API xóa token khi đã sử dụng hoặc hết hạn
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.passwordResetTokenService.remove(+id);
  }
}
