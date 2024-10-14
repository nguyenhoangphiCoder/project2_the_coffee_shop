import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  UseGuards,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { AddressesService } from '../service/address.service'; // Sử dụng 'service' thay vì 'Service'
import { createAddressDTO, UpdateAddressDTO } from '../DTO/address.dto';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  async create(@Body() createAddressDto: createAddressDTO) {
    return this.addressesService.create(createAddressDto);
  }

  @Get()
  async findAll() {
    return this.addressesService.findAll();
  }

  @Get(':address_id')
  async findOne(@Param('address_id') address_id: string) {
    const id = +address_id; // Chuyển đổi sang số
    if (isNaN(id)) {
      throw new NotFoundException('Address ID must be a valid number');
    }
    return this.addressesService.findOne(id);
  }

  @Put(':address_id')
  async update(
    @Param('address_id') address_id: string,
    @Body() updateAddressDto: UpdateAddressDTO,
  ) {
    return this.addressesService.update(+address_id, updateAddressDto);
  }

  @Delete(':address_id')
  async remove(@Param('address_id') address_id: string) {
    return this.addressesService.remove(+address_id);
  }
}
