import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePaymentMethodDTO {
  @IsOptional()
  @IsNotEmpty()
  user_id?: number;

  @IsOptional()
  @IsEnum(['credit_card', 'e_wallet', 'cash_on_delivery'])
  method_type?: 'credit_card' | 'e_wallet' | 'cash_on_delivery';

  @IsOptional()
  @IsString()
  provider_name?: string;

  @IsOptional()
  @IsString()
  account_number?: string;

  @IsOptional()
  expiry_date?: string;
}
export class UpdatePaymentMethodDTO extends PartialType(
  CreatePaymentMethodDTO,
) {}
