import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItems } from 'src/Entities/orderItems.entity';
import { OrderItemToppings } from 'src/Entities/orderItemToppings.entity';
import { Orders } from 'src/Entities/Orders.entity';
import { OrderItemToppingController } from './Controller/OrderToppingItem.controller';
import { OrderItemToppingService } from './Service/OrderItem.service';
import { Toppings } from 'src/Entities/topping.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItemToppings, Orders, OrderItems, Toppings]),
  ],
  controllers: [OrderItemToppingController],
  providers: [OrderItemToppingService],
  exports: [OrderItemToppingService, TypeOrmModule],
})
export class OrderItemToppingModule {}
