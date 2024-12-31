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
import { ProductImageService } from '../Service/productImage.service';
import {
  CreateProductImageDTO,
  UpdateProductImageDTO,
} from '../DTO/productImage.dto';

@Controller('product_images')
export class ProductImageController {
  constructor(private readonly productImageService: ProductImageService) {}

  @Post()
  create(@Body() CreateProductImageDTO: CreateProductImageDTO) {
    return this.productImageService.create(CreateProductImageDTO);
  }

  @Get()
  findAll() {
    return this.productImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productImageService.findOne(id);
  }

  @Get('product/:productId')
  async getImagesByProductId(
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.productImageService.findByProductId(productId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateProductImageDTO: UpdateProductImageDTO,
  ) {
    return this.productImageService.update(id, UpdateProductImageDTO);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productImageService.remove(id);
  }
}
