import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsPositive } from 'class-validator';

export class CreateCartItemDto {
  @IsInt()
  cart_id: number;

  @IsInt()
  product_id: number;

  @IsPositive()
  quantity: number;
}
export class UpdateCartItemDTO extends PartialType(CreateCartItemDto) {}
