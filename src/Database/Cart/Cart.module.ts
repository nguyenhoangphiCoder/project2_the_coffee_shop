import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carts } from 'src/Entities/cart.entity';
import { User } from 'src/Entities/user.entity';
import { CartController } from './Controller/Cart.controller';
import { CartService } from './Service/Cart.service';

@Module({
  imports: [TypeOrmModule.forFeature([Carts, User])],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
