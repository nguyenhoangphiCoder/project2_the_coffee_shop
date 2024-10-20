import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCartDTO {
  @IsNotEmpty()
  @IsNumber()
  user_id?: number;
}
export class UpdateCartDTO extends PartialType(CreateCartDTO) {}
