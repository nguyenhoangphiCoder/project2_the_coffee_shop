import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Franchise_employees } from 'src/Entities/franchiseEmployees.entity';
import { Repository } from 'typeorm';
import {
  CreateFranchiseEmployeeDTO,
  UpdateFranchiseEmployeeDTO,
} from '../DTO/franchiseEmployee.dto';

@Injectable()
export class FranchiseEmployeeService {
  constructor(
    @InjectRepository(Franchise_employees)
    private franchiseEmployeeRepository: Repository<Franchise_employees>,
  ) {}

  //tao moi

  async create(
    CreateFranchiseEmployeeDTO: CreateFranchiseEmployeeDTO,
  ): Promise<Franchise_employees> {
    const franchiseEmployee = this.franchiseEmployeeRepository.create({
      franchise: { id: CreateFranchiseEmployeeDTO.franchise_id }, // Giả định franchise_id là id của franchise
      employee: { id: CreateFranchiseEmployeeDTO.employee_id },
    });
    return this.franchiseEmployeeRepository.save(franchiseEmployee);
  }

  //lay tat ca danh sach tat ca nhan vien trong franchise

  async findAll(): Promise<Franchise_employees[]> {
    return this.franchiseEmployeeRepository.find({
      relations: ['franchise', 'employee'],
    });
  }

  //lay danh sach nhan vien theo id

  async findOne(id: number): Promise<Franchise_employees> {
    const franchiseEmployee = await this.franchiseEmployeeRepository.findOne({
      where: { id },
      relations: ['franchise', 'employee'],
    });
    if (!franchiseEmployee) {
      throw new NotFoundException('not found');
    }
    return franchiseEmployee;
  }
  //cap nhat danh sach nhan vien
  async update(
    id: number,
    UpdateFranchiseEmployeeDTO: UpdateFranchiseEmployeeDTO,
  ): Promise<Franchise_employees> {
    const franchiseEmployee = await this.franchiseEmployeeRepository.findOne({
      where: { id },
    });
    if (!franchiseEmployee) {
      throw new Error('Franchise Employee not found');
    }

    // Cập nhật các thuộc tính của franchiseEmployee từ updateData
    if (UpdateFranchiseEmployeeDTO.franchise_id) {
      franchiseEmployee.franchise = {
        id: UpdateFranchiseEmployeeDTO.franchise_id,
      } as any;
    }
    if (UpdateFranchiseEmployeeDTO.employee_id) {
      franchiseEmployee.employee = {
        id: UpdateFranchiseEmployeeDTO.employee_id,
      } as any;
    }

    return this.franchiseEmployeeRepository.save(franchiseEmployee);
  }

  //xoa danh sach

  async remove(id: number): Promise<void> {
    await this.franchiseEmployeeRepository.delete(id);
  }
}
