import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from '../Cart/Cart.module';
import { productModule } from '../Products/Product.module';
import { CartItems } from 'src/Entities/cartItems.entity';
import { forwardRef, Module } from '@nestjs/common';
import { CartItemController } from './Controller/cartItem.controller';
import { CartItemService } from './Service/CartItem.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartItems]),
    CartItemModule,
    CartModule,
    forwardRef(() => productModule),
  ],
  controllers: [CartItemController],
  providers: [CartItemService],
  exports: [CartItemService, TypeOrmModule],
})
export class CartItemModule {}
