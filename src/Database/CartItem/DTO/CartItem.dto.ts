import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsInt, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateCartItemDto {
  @IsInt()
  cart_id: number;

  @IsInt()
  product_id: number;

  @IsPositive()
  quantity: number;
  @IsNumber()
  adjusted_price: number;
  @IsString()
  size: string;
}
export class UpdateCartItemDTO extends PartialType(CreateCartItemDto) {}
