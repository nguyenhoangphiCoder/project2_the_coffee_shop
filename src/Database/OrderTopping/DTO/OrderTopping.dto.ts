import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrderItemToppingDTO {
  @IsOptional()
  @IsNotEmpty()
  order_item_id?: number;

  @IsOptional()
  @IsNotEmpty()
  topping_id?: number;
}
export class UpdateOrderItemToppingDTO extends PartialType(
  CreateOrderItemToppingDTO,
) {}
