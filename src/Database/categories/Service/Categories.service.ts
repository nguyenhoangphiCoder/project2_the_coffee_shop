import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/Entities/categories.rntity';
import { Repository } from 'typeorm';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../DTO/categories.dto';
import { promises } from 'dns';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Categories)
    private categoryRepository: Repository<Categories>,
  ) {}
  //tao 1 category moi
  async create(CreateCategoryDTO: CreateCategoryDTO): Promise<Categories> {
    const category = this.categoryRepository.create(CreateCategoryDTO);
    return this.categoryRepository.save(category);
  }
  //tim tat ca category
  async findAll(): Promise<Categories[]> {
    return this.categoryRepository.find();
  }
  //tim category theo id
  async findOne(id: number): Promise<Categories> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }
  //cap nhat
  async update(
    id: number,
    UpdateCategoryDTO: UpdateCategoryDTO,
  ): Promise<Categories> {
    const category = await this.findOne(id);
    Object.assign(category, UpdateCategoryDTO);
    return this.categoryRepository.save(category);
  }
  //xoa
  async remove(id: number): Promise<void> {
    const category = await this.categoryRepository.delete(id);
    if (category.affected === 0) {
      throw new NotFoundException('not found');
    }
  }
}
