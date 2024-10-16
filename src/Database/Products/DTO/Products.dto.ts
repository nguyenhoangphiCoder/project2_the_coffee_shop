import {
  IsEmpty,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductsDTO {
  @IsEmpty()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  quantity: number;

  @IsOptional()
  @IsInt()
  quantity_sold: number;

  @IsInt()
  franchise_id: number;

  @IsEmpty()
  created_at: Date;

  @IsEmpty()
  updated_at: Date;
}
export class UpdateProductsDTO {
  @IsEmpty()
  id?: number;

  @IsString()
  name?: string;

  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  quantity?: number;

  @IsOptional()
  @IsInt()
  quantity_sold?: number;

  @IsInt()
  franchise_id?: number;

  @IsEmpty()
  created_at?: Date;

  @IsEmpty()
  updated_at?: Date;
}
