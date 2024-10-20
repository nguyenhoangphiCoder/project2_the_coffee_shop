import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CartService } from '../Service/Cart.service';
import { CreateCartDTO, UpdateCartDTO } from '../DTO/Cart.dto';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Post()
  async create(@Body() createCartDto: CreateCartDTO) {
    return this.cartService.create(createCartDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDTO) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
