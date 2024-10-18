import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, isNotEmpty, IsOptional } from 'class-validator';

export class CreateProductCategoriesDTO {
  @IsOptional()
  @IsNotEmpty()
  category_id?: number;
  @IsOptional()
  @IsNotEmpty()
  product_id?: number;
}

export class UpdateProductCategoriesDTO extends PartialType(
  CreateProductCategoriesDTO,
) {}
