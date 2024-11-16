import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductSizeDTO {
  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @IsEnum(['M', 'L', 'XL'])
  size: 'M' | 'L' | 'XL';

  @IsNumber()
  price_adjustment: number;
}
export class UpdateProductSizeDTO extends PartialType(CreateProductSizeDTO) {}
