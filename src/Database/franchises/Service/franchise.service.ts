import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Franchises } from 'src/Entities/franchises.entity';
import { User } from 'src/Entities/user.entity';
import { Repository } from 'typeorm';
import { CreateFranchiseDTO, UpdateFranchiseDTO } from '../DTO/franchises.dto';
import { retry } from 'rxjs';
import { UpdateAddressDTO } from 'src/Database/address/DTO/address.dto';
import { Promotion } from 'src/Entities/promotions.entity';

@Injectable()
export class FranchiseService {
  constructor(
    @InjectRepository(Franchises)
    private franchiseRepository: Repository<Franchises>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // tao chuoi cua hang moi
  async create(CreateFranchiseDTO: CreateFranchiseDTO): Promise<Franchises> {
    const owner = await this.userRepository.findOneBy({
      id: CreateFranchiseDTO.owner_id,
    });
    if (!owner) throw new NotFoundException('not found');
    const franchise = this.franchiseRepository.create({
      name: CreateFranchiseDTO.name,
      owner,
      address: CreateFranchiseDTO.address,
      phone_number: CreateFranchiseDTO.phone_number,
    });
    return this.franchiseRepository.save(franchise);
  }

  //lay danh sach tat ca chuoi cua hang

  async findAll(): Promise<Franchises[]> {
    return this.franchiseRepository.find();
  }

  // tim mot chuoi cua hang theo id

  async findOne(id: number): Promise<Franchises> {
    const franchise = await this.franchiseRepository.findOneBy({ id });
    if (!franchise) throw new NotFoundException('not found');
    return franchise;
  }

  //cap nhat thong tin

  async update(
    id: number,
    UpdateFranchiseDTO: UpdateFranchiseDTO,
  ): Promise<Franchises> {
    const franchise = await this.findOne(id);
    if (!franchise) throw new NotFoundException('not found');

    franchise.name = UpdateFranchiseDTO.name ?? franchise.name;
    franchise.address = UpdateFranchiseDTO.address ?? franchise.address;
    franchise.phone_number =
      UpdateFranchiseDTO.phone_number ?? franchise.phone_number;

    return this.franchiseRepository.save(franchise);
  }

  // xoa chuoi cua hang

  async remove(id: number): Promise<void> {
    const franchise = await this.franchiseRepository.delete(id);
    if (franchise.affected === 0) throw new NotFoundException('not found');
  }
}
