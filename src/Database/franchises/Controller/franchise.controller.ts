import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { FranchiseService } from '../Service/franchise.service';
import { CreateFranchiseDTO, UpdateFranchiseDTO } from '../DTO/franchises.dto';

@Controller('franchises')
export class FranchisesController {
  constructor(private readonly franchisedService: FranchiseService) {}

  //api tao chuoi cua hang moi

  @Post()
  async create(@Body() CreateFranchiseDTO: CreateFranchiseDTO) {
    return await this.franchisedService.create(CreateFranchiseDTO);
  }

  //api lay danh sach chuoi cua hang

  @Get()
  async findAll() {
    return await this.franchisedService.findAll();
  }

  //api lay theo id
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.franchisedService.findOne(id);
  }

  //api cap nhat hong tin

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateFranchiseDTO: UpdateFranchiseDTO,
  ) {
    return await this.franchisedService.update(id, UpdateFranchiseDTO);
  }

  //api xoa

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.franchisedService.remove(id);
  }
}
