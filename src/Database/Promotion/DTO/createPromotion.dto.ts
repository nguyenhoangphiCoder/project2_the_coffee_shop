import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsEmpty, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreatePromotionDTO {
  @IsEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  discount_type: string;

  @IsNotEmpty()
  @IsString()
  discount_value: number;

  @IsNotEmpty()
  @IsDate()
  start_date: Date;

  @IsNotEmpty()
  @IsDate()
  end_date: Date;

  @IsNotEmpty()
  @IsEnum(['active', 'inactive'])
  status: 'active' | 'inactive';
}
export class UpdatePromotionDTO extends PartialType(CreatePromotionDTO) {}
