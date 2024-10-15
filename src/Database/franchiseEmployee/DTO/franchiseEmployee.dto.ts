import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateFranchiseEmployeeDTO {
  @IsNotEmpty()
  @IsInt()
  readonly franchise_id: number;

  @IsNotEmpty()
  @IsInt()
  readonly employee_id: number;
}
export class UpdateFranchiseEmployeeDTO extends PartialType(
  CreateFranchiseEmployeeDTO,
) {
  @IsNotEmpty()
  @IsInt()
  readonly franchise_id?: number;

  @IsNotEmpty()
  @IsInt()
  readonly employee_id?: number;
}
