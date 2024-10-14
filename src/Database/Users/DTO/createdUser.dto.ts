import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  IsNotEmpty,
} from 'class-validator';
export class createUserDTO {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 20)
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 255)
  password: string;

  @IsOptional()
  @IsString()
  avatar_url: string;

  @IsOptional()
  @IsString()
  @Length(0, 15)
  favorite_theme?: string;

  @IsOptional()
  @IsEnum(['customer', 'employee', 'admin', 'franchise_owner'])
  role?: 'customer' | 'employee' | 'admin' | 'franchise_owner';
}
