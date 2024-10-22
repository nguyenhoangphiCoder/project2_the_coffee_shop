import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carts } from 'src/Entities/cart.entity';
import { CartItems } from 'src/Entities/cartItems.entity';
import { Categories } from 'src/Entities/categories.entity';
import { Franchises } from 'src/Entities/franchises.entity';
import { Product } from 'src/Entities/Product.entity';
import { ProductImages } from 'src/Entities/productImage.entity';
import { ProductSize } from 'src/Entities/productSize.entity';
import { Promotion } from 'src/Entities/promotions.entity';
import { User } from 'src/Entities/user.entity';
import { ProductController } from './Controller/product.controller';
import { ProductsService } from './Service/Products.service';
import { FranchiseModule } from '../franchises/franchise.module';
import { UserModule } from '../Users/user.module';
import { productCategoriesModule } from '../ProductCategories/ProductCategories.module';
import { CartItemModule } from '../CartItem/CartItem.module';
import { ProductPromotionModule } from '../ProductPromotions/productpromotion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductImages,
      ProductSize,
      CartItems,
      Carts,
      Categories,
      User,
      Promotion,
      Franchises,
    ]),
    FranchiseModule,
    UserModule,
    productCategoriesModule,
    CartItemModule,
    ProductPromotionModule,
  ],
  controllers: [ProductController],
  providers: [ProductsService],
  exports: [ProductsService, TypeOrmModule],
})
export class productModule {}
