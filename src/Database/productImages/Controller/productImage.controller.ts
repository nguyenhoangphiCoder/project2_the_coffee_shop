import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
  findOne(@Param('id') id: string) {
    return this.productImageService.FindOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateProductImageDTO: UpdateProductImageDTO,
  ) {
    return this.productImageService.update(+id, UpdateProductImageDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productImageService.remove(+id);
  }
}
