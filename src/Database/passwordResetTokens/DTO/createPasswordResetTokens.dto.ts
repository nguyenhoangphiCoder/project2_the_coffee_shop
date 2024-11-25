import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreatePassWordResetTokensDTO {
  @IsInt()
  user_id?: number;

  @IsString()
  @IsNotEmpty()
  token: string;

  @IsDate()
  @Type(() => Date) // Chuyển đổi chuỗi ngày tháng thành Date
  expired_at: Date;
}
export class ResetPasswordDTO {
  token: string; // Mã token đặt lại mật khẩu
  new_password: string; // Mật khẩu mới
}
export class SendResetTokenDTO {
  email: string;
}
