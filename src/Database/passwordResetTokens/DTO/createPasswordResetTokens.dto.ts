import { IsInt, IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreatePassWordResetTokensDTO {
  @IsInt()
  user_id?: number;

  @IsString()
  @IsNotEmpty()
  token: string;

  @IsDate()
  expired_at: Date;
}
