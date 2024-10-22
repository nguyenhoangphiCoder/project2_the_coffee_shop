import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from 'src/Entities/categories.entity';
import { CategoryController } from './Controller/categories.controller';
import { CategoryService } from './Service/Categories.service';
import { ProductCategories } from 'src/Entities/productcategories.emtity';

@Module({
  imports: [TypeOrmModule.forFeature([Categories, ProductCategories])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
