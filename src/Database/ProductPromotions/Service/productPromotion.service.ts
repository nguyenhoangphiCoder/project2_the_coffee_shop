import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductPromotions } from 'src/Entities/productPromotion.entity';
import { Repository } from 'typeorm';
import { CreateProductPromotionDTO } from '../DTO/productPromotion.dto';
import { Promotion } from 'src/Entities/promotions.entity';
import { Product } from 'src/Entities/Product.entity';

@Injectable()
export class productPromotionService {
  constructor(
    @InjectRepository(ProductPromotions)
    private productPromotionRepository: Repository<ProductPromotions>,
  ) {}

  async create(
    CreateProductPromotionDTO: CreateProductPromotionDTO,
  ): Promise<ProductPromotions> {
    const productPromotion = new ProductPromotions();
    productPromotion.promotions = {
      id: CreateProductPromotionDTO.promotion_id,
    } as Promotion; // Chỉ cần ID để liên kết
    productPromotion.products = {
      id: CreateProductPromotionDTO.product_id,
    } as Product; // Chỉ cần ID để liên kết
    return this.productPromotionRepository.save(productPromotion);
  }

  async findAll(): Promise<ProductPromotions[]> {
    return this.productPromotionRepository.find();
  }

  async findOne(id: number): Promise<ProductPromotions> {
    return this.productPromotionRepository.findOneBy({ id });
  }

  async update(
    id: number,
    CreateProductPromotionDTO: CreateProductPromotionDTO,
  ): Promise<ProductPromotions> {
    const productPromotion = new ProductPromotions();

    // Ánh xạ các thuộc tính từ DTO sang entity
    productPromotion.promotions = {
      id: CreateProductPromotionDTO.promotion_id,
    } as Promotion;
    productPromotion.products = {
      id: CreateProductPromotionDTO.product_id,
    } as Product;

    // Lưu vào cơ sở dữ liệu
    return this.productPromotionRepository.save(productPromotion);
  }

  async remove(id: number): Promise<void> {
    await this.productPromotionRepository.delete(id);
  }
}
