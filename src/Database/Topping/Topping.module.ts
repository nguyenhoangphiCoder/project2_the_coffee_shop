import { Module } from '@nestjs/common';
import { ToppingController } from './Controller/topping.controller';
import { Toppings } from 'src/Entities/topping.entity';
import { ToppingService } from './Service/Topping.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemToppings } from 'src/Entities/orderItemToppings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Toppings, OrderItemToppings])],
  controllers: [ToppingController],
  providers: [ToppingService],
  exports: [ToppingService],
})
export class ToppingModule {}
