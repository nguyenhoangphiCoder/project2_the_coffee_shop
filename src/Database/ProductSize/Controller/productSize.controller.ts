import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductSizeService } from '../Service/ProductSize.service';
import {
  CreateProductSizeDTO,
  UpdateProductSizeDTO,
} from '../DTO/ProductSize.dto';
import { identity } from 'rxjs';

@Controller('product_sizes')
export class ProductSizeController {
  constructor(private readonly productSizeService: ProductSizeService) {}

  @Post()
  create(@Body() CreateProductSizeDTO: CreateProductSizeDTO) {
    return this.productSizeService.create(CreateProductSizeDTO);
  }

  @Get()
  finAll() {
    return this.productSizeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productSizeService.findOne(+id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateProductSizeDTO: UpdateProductSizeDTO,
  ) {
    return this.productSizeService.update(+id, UpdateProductSizeDTO);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productSizeService.remove(+id);
  }
}
