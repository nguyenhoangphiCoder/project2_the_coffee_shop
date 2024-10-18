import { Controller, Module } from '@nestjs/common';
import { ProductImageService } from './Service/productImage.service';
import { ProductController } from '../Products/Controller/product.controller';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImages } from 'src/Entities/productImage.entity';
import { Product } from 'src/Entities/Product.entity';
import { productModule } from '../Products/Product.module';
import { ProductImageController } from './Controller/productImage.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImages, Product]), productModule],
  providers: [ProductImageService],
  controllers: [ProductImageController],
  exports: [ProductImageService],
})
export class ProductImagesModule {}
