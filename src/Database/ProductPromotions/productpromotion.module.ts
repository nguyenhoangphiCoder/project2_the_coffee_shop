import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/Entities/Product.entity';
import { ProductPromotions } from 'src/Entities/productPromotion.entity';
import { User } from 'src/Entities/user.entity';
import { ProductPromotionController } from './Controller/ProductPromotion.controller';
import { ProductSizeService } from '../ProductSize/Service/ProductSize.service';
import { productPromotionService } from './Service/productPromotion.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductPromotions, Product, User])],
  controllers: [ProductPromotionController],
  providers: [productPromotionService],
  exports: [productPromotionService],
})
export class ProductPromotionModule {}
