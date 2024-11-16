import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CartItemService } from '../Service/CartItem.service';
import { CreateCartItemDto, UpdateCartItemDTO } from '../DTO/CartItem.dto';

@Controller('cart_items')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post()
  create(@Body() createCartItemDto: CreateCartItemDto) {
    return this.cartItemService.create(createCartItemDto);
  }

  @Get()
  findAll() {
    return this.cartItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cartItemService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCartItemDto: UpdateCartItemDTO,
  ) {
    return this.cartItemService.update(id, updateCartItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cartItemService.remove(id);
  }
  // API để thêm sản phẩm vào giỏ hàng dựa trên cartId và productId
  @Post('add') // Thêm /add để phân biệt với phương thức create()
  async addProductToCart(
    @Query('cart_id') cart_id: string,
    @Query('product_id') product_id: string,
    @Body() createCartItemDto: CreateCartItemDto,
  ) {
    createCartItemDto.cart_id = +cart_id;
    createCartItemDto.product_id = +product_id;
    return this.cartItemService.create(createCartItemDto);
  }
}
