import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { productPromotionService } from '../Service/productPromotion.service';
import {
  CreateProductPromotionDTO,
  UpdateProductPromotion,
} from '../DTO/productPromotion.dto';
import { ProductPromotions } from 'src/Entities/productPromotion.entity';
import { Product } from 'src/Entities/Product.entity';

@Controller('product_promotions')
export class ProductPromotionController {
  constructor(
    private readonly ProductPromotionService: productPromotionService,
  ) {}

  @Post()
  create(
    @Body() CreateProductPromotionDTO: CreateProductPromotionDTO,
  ): Promise<ProductPromotions> {
    return this.ProductPromotionService.create(CreateProductPromotionDTO);
  }

  @Get()
  FindAll(): Promise<ProductPromotions[]> {
    return this.ProductPromotionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ProductPromotionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateProductPromotion: UpdateProductPromotion,
  ) {
    return this.ProductPromotionService.update(+id, UpdateProductPromotion);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ProductPromotionService.remove(+id);
  }
}
