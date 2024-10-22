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
  findAll(@Query('name') name?: string) {
    return this.ProductsService.findAll(name); // Tìm tất cả sản phẩm hoặc theo tên
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.ProductsService.findOneByName(name); // Tìm sản phẩm theo tên
  }

  @Post()
  create(@Body() CreateProductsDTO: CreateProductsDTO) {
    return this.ProductsService.create(CreateProductsDTO);
  }

  @Patch(':name')
  update(
    @Param('name') name: string,
    @Body() UpdateProductsDTO: UpdateProductsDTO,
  ) {
    return this.ProductsService.update(name, UpdateProductsDTO); // Cập nhật theo tên
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.ProductsService.remove(name); // Xóa theo tên
  }

  @Get('search')
  async searchProducts(@Query('name') name: string): Promise<Product[]> {
    return this.ProductsService.findByName(name);
  }
}
