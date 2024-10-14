import { Controller, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promotion } from 'src/Entities/promotions.entity';
import { PromotionController } from './controller/promotion.controller';
import { PromotionService } from './service/promotion.service';
import { ProductPromotions } from 'src/Entities/productPromotion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Promotion, ProductPromotions])],
  controllers: [PromotionController],
  providers: [PromotionService],
  exports: [PromotionService],
})
export class PromotionModule {}
