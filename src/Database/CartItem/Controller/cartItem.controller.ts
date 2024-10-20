import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
}
