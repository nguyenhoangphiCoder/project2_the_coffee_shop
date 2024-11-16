import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carts } from 'src/Entities/cart.entity';
import { Repository } from 'typeorm';
import { CreateCartDTO, UpdateCartDTO } from '../DTO/Cart.dto';
import { User } from 'src/Entities/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Carts)
    private readonly CartRepository: Repository<Carts>,
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}
  async findAll(): Promise<Carts[]> {
    return this.CartRepository.find();
  }
  async findOne(id: number): Promise<Carts> {
    const cart = await this.CartRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!cart) {
      throw new NotFoundException('not found');
    }
    return cart;
  }
  async create(CreateCartDTO: CreateCartDTO): Promise<Carts> {
    const user = await this.UserRepository.findOne({
      where: { id: CreateCartDTO.user_id },
    });
    if (!user) {
      throw new NotFoundException('not found');
    }
    const cart = this.CartRepository.create({ user });
    return this.CartRepository.save(cart);
  }
  async update(id: number, updateCartDto: UpdateCartDTO): Promise<Carts> {
    const cart = await this.findOne(id);

    if (updateCartDto.user_id) {
      const user = await this.UserRepository.findOne({
        where: { id: updateCartDto.user_id },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      cart.user = user;
    }

    return this.CartRepository.save(cart);
  }
  async remove(id: number): Promise<void> {
    const cart = await this.findOne(id);
    await this.CartRepository.remove(cart);
  }
  // API để lấy giỏ hàng theo userId
  async findByUserId(user_id: number): Promise<Carts> {
    const user = await this.UserRepository.findOne({
      where: { id: user_id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.CartRepository.findOne({
      where: { user },
    });
  }
}
