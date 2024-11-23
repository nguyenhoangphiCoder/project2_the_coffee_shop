import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PaymentMethodService } from '../Service/paymentmethod.service';
import { PaymentMethod } from 'src/Entities/paymentMethod.entity';
import {
  CreatePaymentMethodDTO,
  UpdatePaymentMethodDTO,
} from '../DTO/paymentMethod.dto';
import { userService } from 'src/Database/Users/Service/user.service';

@Controller('payment_methods')
export class PaymentMethodController {
  constructor(
    private readonly paymentMethodService: PaymentMethodService,
    private readonly userService: userService,
  ) {}

  // Tạo mới một payment method
  @Post()
  async create(@Body() createPaymentMethodDto: CreatePaymentMethodDTO) {
    const paymentMethod = new PaymentMethod();

    paymentMethod.method_type = createPaymentMethodDto.method_type;
    paymentMethod.provider_name = createPaymentMethodDto.provider_name;
    paymentMethod.created_at = new Date(); // Gán thời gian tạo
    paymentMethod.user = await this.userService.findOne(
      createPaymentMethodDto.user_id,
    ); // Lấy thông tin user
    paymentMethod.Orders = []; // Khởi tạo Orders (nếu có)

    // Lưu và trả về payment method vừa tạo
    return this.paymentMethodService.create(paymentMethod);
  }

  // Lấy một payment method theo ID
  @Get(':payment_method_id')
  async findOne(
    @Param('payment_method_id') payment_method_id: number,
  ): Promise<PaymentMethod> {
    return this.paymentMethodService.findById(payment_method_id);
  }

  // Cập nhật thông tin payment method theo ID
  @Patch(':payment_method_id')
  async update(
    @Param('payment_method_id') payment_method_id: number,
    @Body() updatePaymentMethodDto: UpdatePaymentMethodDTO,
  ) {
    return this.paymentMethodService.update(
      payment_method_id,
      updatePaymentMethodDto,
    );
  }

  // Xóa payment method theo ID
  @Delete(':payment_method_id')
  async delete(@Param('payment_method_id') payment_method_id: number) {
    return this.paymentMethodService.delete(payment_method_id);
  }

  // Lấy tất cả payment methods
  @Get()
  async findAll() {
    return this.paymentMethodService.findAll();
  }
}
