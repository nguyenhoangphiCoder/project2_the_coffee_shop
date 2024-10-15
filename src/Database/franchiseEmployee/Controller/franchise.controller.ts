import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FranchiseEmployeeService } from '../service/franchiseEmployee.service';
import {
  CreateFranchiseEmployeeDTO,
  UpdateFranchiseEmployeeDTO,
} from '../DTO/franchiseEmployee.dto';

import { Franchise_employees } from 'src/Entities/franchiseEmployees.entity';

@Controller('franchise_employees')
export class FranchiseEmployeeController {
  constructor(
    private readonly franchiseEmployeeService: FranchiseEmployeeService,
  ) {}

  @Post()
  create(
    @Body() CreateFranchiseEmployeeDTO: CreateFranchiseEmployeeDTO,
  ): Promise<Franchise_employees> {
    return this.franchiseEmployeeService.create(CreateFranchiseEmployeeDTO);
  }

  @Get()
  findAll(): Promise<Franchise_employees[]> {
    return this.franchiseEmployeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Franchise_employees> {
    return this.franchiseEmployeeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() UpdateFranchiseEmployeeDTO: UpdateFranchiseEmployeeDTO,
  ): Promise<Franchise_employees> {
    return this.franchiseEmployeeService.update(id, UpdateFranchiseEmployeeDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.franchiseEmployeeService.remove(id);
  }
}
