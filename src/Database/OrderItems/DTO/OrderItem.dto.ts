import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateOrderItemDTO {
  @IsNotEmpty()
  order_id: number;

  @IsNotEmpty()
  product_id: number;

  @IsNotEmpty()
  @IsEnum(['M', 'L', 'XL'])
  size: 'M' | 'L' | 'XL';

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsEnum(['pending', 'complete', 'cancelled'])
  status?: 'pending' | 'complete' | 'cancelled';
}
export class UpdateOrderItemsDTO extends PartialType(CreateOrderItemDTO) {}
