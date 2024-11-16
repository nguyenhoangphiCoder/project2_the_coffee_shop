import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carts } from 'src/Entities/cart.entity';
import { CartItems } from 'src/Entities/cartItems.entity';
import { Product } from 'src/Entities/Product.entity';
import { Repository } from 'typeorm';
import { CreateCartItemDto, UpdateCartItemDTO } from '../DTO/CartItem.dto';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItems)
    private readonly cartItemRepository: Repository<CartItems>,

    @InjectRepository(Carts)
    private readonly cartRepository: Repository<Carts>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Tạo mới một cartItem
  async create(createCartItemDto: CreateCartItemDto): Promise<CartItems> {
    const cart = await this.cartRepository.findOne({
      where: { id: createCartItemDto.cart_id },
    });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const product = await this.productRepository.findOne({
      where: { id: createCartItemDto.product_id },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const cartItem = this.cartItemRepository.create({
      cart,
      product,
      quantity: createCartItemDto.quantity,
      size: createCartItemDto.size,
      adjusted_price: createCartItemDto.adjusted_price,
    });

    return this.cartItemRepository.save(cartItem);
  }

  // Lấy tất cả cartItems
  async findAll(): Promise<CartItems[]> {
    return this.cartItemRepository.find({ relations: ['cart', 'product'] });
  }

  // Lấy một cartItem theo ID
  async findOne(id: number): Promise<CartItems> {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id },
      relations: ['cart', 'product'],
    });
    if (!cartItem) {
      throw new NotFoundException('CartItem not found');
    }
    return cartItem;
  }

  // Cập nhật cartItem
  async update(
    id: number,
    updateCartItemDto: UpdateCartItemDTO,
  ): Promise<CartItems> {
    const cartItem = await this.findOne(id);
    if (updateCartItemDto.quantity !== undefined) {
      cartItem.quantity = updateCartItemDto.quantity;
    }
    return this.cartItemRepository.save(cartItem);
  }

  // Xóa cartItem
  async remove(id: number): Promise<void> {
    const cartItem = await this.findOne(id);
    await this.cartItemRepository.remove(cartItem);
  }
}
