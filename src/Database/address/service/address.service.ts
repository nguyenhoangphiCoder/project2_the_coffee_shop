import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { addresses } from 'src/Entities/address.entity';
import { userService } from 'src/Database/Users/Service/user.service';
import { createAddressDTO, UpdateAddressDTO } from '../DTO/address.dto';
import { updateUserDTO } from 'src/Database/Users/DTO/updateUser.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(addresses)
    private readonly addressRepository: Repository<addresses>,
    private readonly userService: userService,
  ) {}

  // Tạo địa chỉ mới
  async create(createAddressDto: createAddressDTO) {
    // Tìm user dựa vào userId từ DTO
    const user = await this.userService.findOne(createAddressDto.user_id);
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createAddressDto.user_id} not found`,
      );
    }

    // Tạo địa chỉ với thông tin user
    const address = this.addressRepository.create({
      ...createAddressDto,
      user, // Liên kết User với Address
    });

    return this.addressRepository.save(address);
  }

  // Lấy tất cả địa chỉ
  findAll() {
    return this.addressRepository.find();
  }

  // Lấy một địa chỉ cụ thể
  async findOne(address_id: number) {
    if (address_id === null || address_id === undefined || isNaN(address_id)) {
      throw new NotFoundException('Address ID must be a valid number');
    }
    return this.addressRepository.findOne({
      where: { address_id: address_id },
    });
  }

  // Cập nhật một địa chỉ
  async update(address_id: number, updateAddressDto: UpdateAddressDTO) {
    await this.addressRepository.update(address_id, updateAddressDto);
    return this.findOne(address_id);
  }

  // Xóa một địa chỉ
  async remove(address_id: number) {
    const address = await this.findOne(address_id);
    if (!address) {
      throw new NotFoundException(`Address with ID ${address_id} not found`);
    }
    return this.addressRepository.remove(address);
  }
}
