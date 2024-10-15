import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from 'src/Entities/categories.rntity';
import { CategoryController } from './Controller/categories.controller';
import { CategoryService } from './Service/Categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Categories])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
