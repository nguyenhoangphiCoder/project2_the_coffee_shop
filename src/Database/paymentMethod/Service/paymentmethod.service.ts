import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from 'src/Entities/paymentMethod.entity';
import { Repository } from 'typeorm';
import {
  CreatePaymentMethodDTO,
  UpdatePaymentMethodDTO,
} from '../DTO/paymentMethod.dto';
import { User } from 'src/Entities/user.entity';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectRepository(PaymentMethod)
    private paymentMethodRepository: Repository<PaymentMethod>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(paymentMethod: PaymentMethod): Promise<PaymentMethod> {
    // Kiểm tra xem user có tồn tại không
    const user = await this.usersRepository.findOne({
      where: { id: paymentMethod.user_id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Tạo PaymentMethod mới
    const newPaymentMethod = this.paymentMethodRepository.create(paymentMethod);
    newPaymentMethod.user = user; // Liên kết đến user
    return this.paymentMethodRepository.save(newPaymentMethod);
  }
  async update(
    payment_method_id: number,
    updatePaymentMethodDto: UpdatePaymentMethodDTO,
  ) {
    const result = await this.paymentMethodRepository.update(
      payment_method_id,
      updatePaymentMethodDto,
    );
    if (result.affected === 0) {
      throw new NotFoundException(
        `Phương thức thanh toán với ID ${payment_method_id} không tồn tại.`,
      );
    }
    return this.findById(payment_method_id); // Trả về đối tượng đã được cập nhật
  }

  async findById(payment_method_id: number): Promise<PaymentMethod> {
    const paymentMethod = await this.paymentMethodRepository.findOne({
      where: { payment_method_id: payment_method_id },
    });
    if (!paymentMethod) {
      throw new NotFoundException(
        `Phương thức thanh toán với ID ${payment_method_id} không tồn tại.`,
      );
    }
    return paymentMethod;
  }

  findAll() {
    return this.paymentMethodRepository.find();
  }

  async delete(id: number) {
    const result = await this.paymentMethodRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Phương thức thanh toán với ID ${id} không tồn tại.`,
      );
    }
    return { message: `Đã xóa phương thức thanh toán với ID ${id}.` };
  }
}
