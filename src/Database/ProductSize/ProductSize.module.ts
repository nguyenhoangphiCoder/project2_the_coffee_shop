import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/Entities/Product.entity';
import { ProductSize } from 'src/Entities/productSize.entity';
import { ProductSizeController } from './Controller/productSize.controller';
import { ProductSizeService } from './Service/ProductSize.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSize, Product])],
  controllers: [ProductSizeController],
  providers: [ProductSizeService],
  exports: [ProductSizeService],
})
export class ProductSizeMOdule {}
