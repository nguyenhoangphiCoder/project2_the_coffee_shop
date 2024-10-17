import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateProductPromotionDTO {
  @IsNotEmpty()
  @IsInt()
  promotion_id?: number;

  @IsNotEmpty()
  @IsInt()
  product_id?: number;
}

export class UpdateProductPromotion extends PartialType(
  CreateProductPromotionDTO,
) {}
