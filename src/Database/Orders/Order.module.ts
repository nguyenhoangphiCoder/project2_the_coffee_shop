import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Franchises } from 'src/Entities/franchises.entity';
import { Orders } from 'src/Entities/Orders.entity';
import { PaymentMethod } from 'src/Entities/paymentMethod.entity';
import { User } from 'src/Entities/user.entity';
import { OrderController } from './Controller/order.controller';
import { OrderService } from './Service/Order.service';
import { OrderItems } from 'src/Entities/orderItems.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Orders,
      User,
      PaymentMethod,
      Franchises,
      OrderItems,
    ]),
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
