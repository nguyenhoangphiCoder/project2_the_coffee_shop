import { Controller, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategories } from 'src/Entities/productcategories.emtity';
import { productCategoryService } from './Service/productCtaegories.service';
import { ProductCategoryController } from './Controller/ProductCategories.controller';
import { Product } from 'src/Entities/Product.entity';
import { Categories } from 'src/Entities/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategories, Product, Categories])],
  providers: [productCategoryService],
  controllers: [ProductCategoryController],
  exports: [productCategoryService, TypeOrmModule],
})
export class productCategoriesModule {}
