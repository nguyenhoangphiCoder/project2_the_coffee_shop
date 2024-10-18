import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from 'src/Entities/Orders.entity';
import { Repository } from 'typeorm';
import { CreateOrderDTO, UpdateOrderDTO } from '../DTO/Order.dto';
import { User } from 'src/Entities/user.entity';
import { PaymentMethod } from 'src/Entities/paymentMethod.entity';
import { Franchises } from 'src/Entities/franchises.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private readonly OrderRepository: Repository<Orders>,
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository: Repository<PaymentMethod>,
    @InjectRepository(Franchises)
    private readonly franchiseRepository: Repository<Franchises>,
  ) {}

  // tao don hang moi

  async create(CreateOrderDTO: CreateOrderDTO): Promise<Orders> {
    //tim cac entity tuong ung dua tren ID

    const User = await this.UserRepository.findOne({
      where: { id: CreateOrderDTO.user_id },
    });
    const paymentMethod = await this.paymentMethodRepository.findOne({
      where: { payment_method_id: CreateOrderDTO.payment_method_id },
    });
    const managedBy = await this.UserRepository.findOne({
      where: { id: CreateOrderDTO.managed_by },
    });
    const franchise = await this.franchiseRepository.findOne({
      where: { id: CreateOrderDTO.franchise_id },
    });

    //kiem tr ca entity ton tai
    if (!User || !paymentMethod || !managedBy || !franchise) {
      throw new Error('not found entity');
    }

    // tao doi tuong Order tu DTO

    const Order = this.OrderRepository.create({
      ...CreateOrderDTO,
      user: User,
      payment_method: paymentMethod,
      managed_by: managedBy,
      franchise,
    });
    return this.OrderRepository.save(Order);
  }
  //liet ke tat ca don hang
  async findAll(): Promise<Orders[]> {
    return this.OrderRepository.find({
      relations: ['user', 'payment_method', 'managed_by', 'franchise'],
    });
  }
  //tim kiem don hang theo id
  async findOne(id: number): Promise<Orders> {
    const order = await this.OrderRepository.findOne({
      where: { id },
      relations: ['user', 'payment_method', 'managed_by', 'franchise'],
    });
    if (!order) {
      throw new NotFoundException('not found');
    }
    return order;
  }
  //cap nhat don hang
  async update(id: number, UpdateOrderDTO: UpdateOrderDTO): Promise<Orders> {
    const order = await this.findOne(id);
    Object.assign(order, UpdateOrderDTO);
    return this.OrderRepository.save(order);
  }

  // xoa don hang
  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.OrderRepository.remove(order);
  }
}
