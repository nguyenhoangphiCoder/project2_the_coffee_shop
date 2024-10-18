import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductImageDTO {
  @IsNotEmpty()
  @IsString()
  image_url?: string;

  @IsNotEmpty()
  @IsString()
  product_id?: string;
}

export class UpdateProductImageDTO extends PartialType(CreateProductImageDTO) {}
