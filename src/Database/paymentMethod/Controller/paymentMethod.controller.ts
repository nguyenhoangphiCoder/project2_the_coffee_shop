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
  @Post()
  async create(@Body() createPaymentMethodDto: CreatePaymentMethodDTO) {
    // Tạo một đối tượng PaymentMethod từ DTO
    const paymentMethod = new PaymentMethod();

    // Gán các thuộc tính từ DTO
    paymentMethod.method_type = createPaymentMethodDto.method_type;
    paymentMethod.provider_name = createPaymentMethodDto.provider_name;

    // Các thuộc tính khác có thể gán giá trị mặc định hoặc tự động
    paymentMethod.created_at = new Date(); // Gán thời gian hiện tại
    paymentMethod.user = await this.userService.findById(
      createPaymentMethodDto.user_id,
    ); // Lấy user từ userService
    paymentMethod.Orders = []; // Nếu có Orders thì bạn có thể gán sau hoặc để trống

    // Sau đó, lưu đối tượng PaymentMethod vào database
    return this.paymentMethodService.create(paymentMethod);
  }

  @Get(':payment_method_id')
  async findOne(
    @Param('payment_method_id') payment_method_id: number,
  ): Promise<PaymentMethod> {
    return await this.paymentMethodService.findById(payment_method_id);
  }
  @Get(':payment_method_id')
  findById(@Param('payment_method_id') payment_method_id: number) {
    return this.paymentMethodService.findById(payment_method_id);
  }

  @Patch(':payment_method_id')
  update(
    @Param('payment_method_id') payment_method_id: number,
    @Body() updatePaymentMethodDto: UpdatePaymentMethodDTO,
  ) {
    return this.paymentMethodService.update(
      payment_method_id,
      updatePaymentMethodDto,
    );
  }

  @Delete(':payment_method_id')
  delete(@Param('payment_method_id') payment_method_id: number) {
    return this.paymentMethodService.delete(payment_method_id);
  }

  @Get()
  findAll() {
    return this.paymentMethodService.findAll();
  }
}
