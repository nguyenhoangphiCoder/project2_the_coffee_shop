import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItems } from 'src/Entities/orderItems.entity';
import { Orders } from 'src/Entities/Orders.entity';
import { OrderItemController } from './Controller/OrderItem.controller';
import { OrderItemService } from './Service/OrderItem.service';
import { productModule } from '../Products/Product.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItems, Orders]), productModule],
  controllers: [OrderItemController],
  providers: [OrderItemService],
  exports: [OrderItemService],
})
export class OrderItemsModule {}
