import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductsDTO {
  // id không cần trong yêu cầu tạo sản phẩm mới
  @IsOptional() // Để nó không bắt buộc
  id?: number;

  @IsString()
  @IsNotEmpty() // Đảm bảo tên không rỗng
  name: string;

  @IsString()
  @IsNotEmpty() // Đảm bảo giá không rỗng
  price: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @IsNotEmpty() // Đảm bảo số lượng không rỗng
  quantity: number;

  @IsOptional()
  @IsInt()
  quantity_sold?: number;

  @IsInt()
  @IsNotEmpty() // Đảm bảo franchise_id không rỗng
  franchise_id: number;

  @IsOptional() // Không cần bắt buộc
  created_at?: Date;

  @IsOptional() // Không cần bắt buộc
  updated_at?: Date;
}

export class UpdateProductsDTO {
  @IsOptional() // Để nó không bắt buộc
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
  @IsOptional() // Không cần bắt buộc
  franchise_id?: number;

  @IsOptional() // Không cần bắt buộc
  created_at?: Date;

  @IsOptional() // Không cần bắt buộc
  updated_at?: Date;
}
