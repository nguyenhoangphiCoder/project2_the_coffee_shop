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
import { CreateProductsDTO, UpdateProductsDTO } from '../DTO/Products.dto';
import { Product } from 'src/Entities/Product.entity';

@Controller('Products')
export class ProductController {
  constructor(private readonly ProductsService: ProductsService) {}

  @Get()
  findAll() {
    return this.ProductsService.findAll(); // Tìm tất cả sản phẩm hoặc theo tên
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ProductsService.findOne(id); // Tìm sản phẩm theo id
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
    return this.ProductsService.update(id, UpdateProductsDTO); // Cập nhật theo id
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ProductsService.remove(id); // Xóa theo id
  }

  @Get('search')
  async searchProducts(@Query('name') name: string): Promise<Product[]> {
    return this.ProductsService.findByName(name);
  }
}
