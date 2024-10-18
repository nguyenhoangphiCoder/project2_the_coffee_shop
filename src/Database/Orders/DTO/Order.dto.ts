import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

export class CreateOrderDTO {
  @IsOptional()
  @IsInt()
  user_id?: number;

  @IsOptional()
  @IsInt()
  payment_method_id?: number;

  @IsOptional()
  @IsInt()
  managed_by?: number;

  @IsOptional()
  @IsInt()
  buyer_name?: string;

  @IsOptional()
  @IsPhoneNumber(null)
  buyer_phone?: string;

  @IsOptional()
  @IsEmail()
  buyer_email?: string;

  @IsOptional()
  @IsInt()
  franchise_id?: number;

  @IsOptional()
  @IsEnum(['pending', 'completed', 'cancelled'])
  status?: 'pending' | 'completed' | 'cancelled';
}
export class UpdateOrderDTO extends PartialType(CreateOrderDTO) {}
