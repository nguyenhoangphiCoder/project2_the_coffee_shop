import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Promotion } from 'src/Entities/promotions.entity';
import { Repository } from 'typeorm';
import {
  CreatePromotionDTO,
  UpdatePromotionDTO,
} from '../DTO/createPromotion.dto';
import { promises } from 'dns';

export class PromotionService {
  constructor(
    @InjectRepository(Promotion)
    private PromotionRepository: Repository<Promotion>,
  ) {}
  create(CreatePromotionDTO: CreatePromotionDTO): Promise<Promotion> {
    const promotion = this.PromotionRepository.create(CreatePromotionDTO); //tao 1 doi tuong tu dto
    return this.PromotionRepository.save(promotion);
  }
  findAll(): Promise<Promotion[]> {
    return this.PromotionRepository.find();
  }
  async findOne(id: number): Promise<Promotion> {
    const promotion = await this.PromotionRepository.findOneBy({ id });
    return promotion; // Đây sẽ là undefined nếu không tìm thấy
  }

  async update(
    id: number,
    UpdatePromotionDTO: UpdatePromotionDTO,
  ): Promise<Promotion> {
    await this.PromotionRepository.update(id, UpdatePromotionDTO);
    return this.findOne(id);
  }
  async remove(id: number): Promise<void> {
    await this.PromotionRepository.delete(id); // Đợi cho đến khi xóa xong
  }
}
