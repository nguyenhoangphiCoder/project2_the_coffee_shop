import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateFranchiseDTO {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  name: string;

  @IsNotEmpty()
  @IsNumber({})
  owner_id: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  address: string;

  @IsOptional()
  @IsPhoneNumber(null)
  phone_number?: string;
}
export class UpdateFranchiseDTO {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  address?: string;

  @IsOptional()
  @IsPhoneNumber(null)
  phone_number?: string;
}
