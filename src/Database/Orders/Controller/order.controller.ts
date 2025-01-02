import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderService } from '../Service/Order.service';
import {
  CreateOrderDTO,
  SendInvoiceDTO,
  UpdateOrderDTO,
} from '../DTO/Order.dto';
import { Orders } from 'src/Entities/Orders.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Tạo đơn hàng mới
  @Post()
  async create(@Body() createOrderDTO: CreateOrderDTO): Promise<Orders> {
    return this.orderService.create(createOrderDTO);
  }

  // Liệt kê tất cả đơn hàng
  @Get()
  async findAll(): Promise<Orders[]> {
    return this.orderService.findAll();
  }

  // Tìm kiếm đơn hàng theo id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Orders> {
    return this.orderService.findOne(+id);
  }

  // Cập nhật đơn hàng
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDTO: UpdateOrderDTO,
  ): Promise<Orders> {
    return this.orderService.update(+id, updateOrderDTO);
  }

  // Xóa đơn hàng
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.orderService.remove(+id);
  }

  // Tạo đơn hàng từ giỏ hàng
  @Post('cart')
  async createOrderFromCart(
    @Body('user_id') user_id: number,
    @Body('payment_method_id') payment_method_id: number,
    @Body('franchise_id') franchise_id: number,
  ): Promise<Orders> {
    return this.orderService.createOrderFromCart(
      user_id,
      payment_method_id,
      franchise_id,
    );
  }
  @Delete()
  async removeAll(): Promise<void> {
    return this.orderService.removeAll(); // Gọi phương thức xóa tất cả từ service
  }
  @Get('user/:user_id/orders')
  async findOrdersByUserId(@Param('user_id') user_id: number) {
    return this.orderService.findOrdersByUserId(user_id);
  }
  @Post('send-invoice')
  async sendInvoiceToEmail(@Body('email') email: string): Promise<string> {
    return this.orderService.sendInvoiceToEmail(email);
  }
}
