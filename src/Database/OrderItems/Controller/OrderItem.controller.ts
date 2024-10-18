import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderItemService } from '../Service/OrderItem.service';
import { CreateOrderItemDTO, UpdateOrderItemsDTO } from '../DTO/OrderItem.dto';
import { OrderItems } from 'src/Entities/orderItems.entity';

@Controller('order_items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}
  @Post()
  create(@Body() CreateOrderItemDTO: CreateOrderItemDTO): Promise<OrderItems> {
    return this.orderItemService.create(CreateOrderItemDTO);
  }
  @Get()
  FindAll(): Promise<OrderItems[]> {
    return this.orderItemService.findAll();
  }
  @Get(':id')
  FindOne(@Param('id') id: string): Promise<OrderItems> {
    return this.orderItemService.findOne(+id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateOrderItemsDTO: UpdateOrderItemsDTO,
  ): Promise<OrderItems> {
    return this.orderItemService.update(+id, UpdateOrderItemsDTO);
  }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.orderItemService.remove(+id);
  }
}
