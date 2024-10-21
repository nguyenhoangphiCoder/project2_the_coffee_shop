import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from '../Service/Products.service';
import { get } from 'http';
import { CreateProductsDTO, UpdateProductsDTO } from '../DTO/Products.dto';

@Controller('Products')
export class ProductController {
  constructor(private readonly ProductsService: ProductsService) {}

  @Get()
  findAll() {
    return this.ProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ProductsService.findOne(+id);
  }

  @Post()
  create(@Body() CreateProductsDTO: CreateProductsDTO) {
    return this.ProductsService.create(CreateProductsDTO);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateProductsDTO: UpdateProductsDTO,
  ) {
    return this.ProductsService.update(+id, UpdateProductsDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ProductsService.remove(+id);
  }
  @Get('search')
  async searchProducts(@Param('name') name: string) {
    console.log('Query parameter name:', name);
    return this.ProductsService.findByName(+name);
  }
}
