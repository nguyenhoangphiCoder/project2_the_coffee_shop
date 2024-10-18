import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderService } from '../Service/Order.service';
import { CreateOrderDTO, UpdateOrderDTO } from '../DTO/Order.dto';
import { Orders } from 'src/Entities/Orders.entity';
import { updateUserDTO } from 'src/Database/Users/DTO/updateUser.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  async create(@Body() CreateOrderDTO: CreateOrderDTO): Promise<Orders> {
    return this.orderService.create(CreateOrderDTO);
  }
  @Get()
  async findAll(): Promise<Orders[]> {
    return this.orderService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Orders> {
    return this.orderService.findOne(+id);
  }
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() UpdateOrderDTO: UpdateOrderDTO,
  ): Promise<Orders> {
    return this.orderService.update(+id, UpdateOrderDTO);
  }
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.orderService.remove(+id);
  }
}
