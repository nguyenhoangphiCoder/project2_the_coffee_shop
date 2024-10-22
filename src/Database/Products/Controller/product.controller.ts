import {
  BadRequestException,
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
import { Product } from 'src/Entities/Product.entity';

@Controller('Products')
export class ProductController {
  constructor(private readonly ProductsService: ProductsService) {}

  @Get()
  findAll() {
    return this.ProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const productId = parseInt(id, 10); // Chuyển đổi ID từ string sang number
    if (isNaN(productId)) {
      throw new BadRequestException('Invalid product ID');
    }
    return this.ProductsService.findOne(productId);
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
}
