import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { productCategoryService } from '../Service/productCtaegories.service';
import {
  CreateProductCategoriesDTO,
  UpdateProductCategoriesDTO,
} from '../DTO/ProductCtaegories.dto';
import { get } from 'http';
import { find } from 'rxjs';
import { UpdateAddressDTO } from 'src/Database/address/DTO/address.dto';

@Controller('product_categories')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: productCategoryService,
  ) {}
  @Post()
  create(@Body() CreateProductCategoriesDTO: CreateProductCategoriesDTO) {
    return this.productCategoryService.create(CreateProductCategoriesDTO);
  }

  @Get()
  FindAll() {
    return this.productCategoryService.FindAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productCategoryService.FindOne(+id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateProductCategoriesDTO: UpdateProductCategoriesDTO,
  ) {
    return this.productCategoryService.update(+id, UpdateProductCategoriesDTO);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productCategoryService.remove(+id);
  }
}
