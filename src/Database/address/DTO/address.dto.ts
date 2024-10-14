import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class createAddressDTO {
  @IsNotEmpty()
  @IsString()
  address_line: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsOptional() // co the trong
  @IsString()
  state?: string;

  @IsNotEmpty()
  @IsString()
  postal_code: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsOptional()
  is_default?: boolean; //dia chi co phai mac dinh khong
  user_id: number;
}
export class UpdateAddressDTO extends PartialType(createAddressDTO) {}
