import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}
export class UpdateCategoryDTO {
  @IsString()
  name?: string;
}
