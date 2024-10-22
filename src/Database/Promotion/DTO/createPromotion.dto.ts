import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsDate, IsEmpty, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreatePromotionDTO {
  @IsNotEmpty()
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
  @Type(() => Date)
  start_date: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  end_date: Date;

  @IsNotEmpty()
  @IsEnum(['active', 'inactive'])
  status: 'active' | 'inactive';
}
export class UpdatePromotionDTO extends PartialType(CreatePromotionDTO) {}
