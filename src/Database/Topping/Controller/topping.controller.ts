import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ToppingService } from '../Service/Topping.service';
import { CreateToppingDTO, UpdateToppingDTO } from '../DTO/createTopping.dto';

@Controller('toppings')
export class ToppingController {
  constructor(private readonly ToppingsService: ToppingService) {}

  @Post()
  create(@Body() CreateToppingDTO: CreateToppingDTO) {
    return this.ToppingsService.create(CreateToppingDTO);
  }

  @Get()
  findAll() {
    return this.ToppingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ToppingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateToppingDTO: UpdateToppingDTO) {
    return this.ToppingsService.update(+id, UpdateToppingDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ToppingsService.remove(+id);
  }
}
