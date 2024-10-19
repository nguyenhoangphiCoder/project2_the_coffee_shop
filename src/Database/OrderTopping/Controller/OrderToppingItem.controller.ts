import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderItemToppingService } from '../Service/OrderItem.service';
import {
  CreateOrderItemToppingDTO,
  UpdateOrderItemToppingDTO,
} from '../DTO/OrderTopping.dto';

@Controller('order_item_toppings')
export class OrderItemToppingController {
  constructor(
    private readonly orderItemToppingSerVice: OrderItemToppingService,
  ) {}
  @Post()
  create(@Body() CreateOrderItemToppingDTO: CreateOrderItemToppingDTO) {
    return this.orderItemToppingSerVice.create(CreateOrderItemToppingDTO);
  }
  @Get()
  findAll() {
    return this.orderItemToppingSerVice.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderItemToppingSerVice.findOne(+id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateOrderItemToppingDTO: UpdateOrderItemToppingDTO,
  ) {
    return this.orderItemToppingSerVice.update(+id, UpdateOrderItemToppingDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderItemToppingSerVice.remove(+id);
  }
}
