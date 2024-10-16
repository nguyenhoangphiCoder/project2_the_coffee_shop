import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from '../Service/Categories.service';
import { CreateCategoryDTO } from '../DTO/categories.dto';
import { Categories } from 'src/Entities/categories.entity';
import { updateUserDTO } from 'src/Database/Users/DTO/updateUser.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() CreateCategoryDTO: CreateCategoryDTO): Promise<Categories> {
    return this.categoryService.create(CreateCategoryDTO);
  }

  @Get()
  findAll9(): Promise<Categories[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Categories> {
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: updateUserDTO,
  ): Promise<Categories> {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.categoryService.remove(id);
  }
}
