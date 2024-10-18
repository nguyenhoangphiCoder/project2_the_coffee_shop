import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImages } from 'src/Entities/productImage.entity';
import { Repository } from 'typeorm';
import {
  CreateProductImageDTO,
  UpdateProductImageDTO,
} from '../DTO/productImage.dto';
import { Product } from 'src/Entities/Product.entity';

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImages)
    private productImageRepository: Repository<ProductImages>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(
    createProductImageDto: CreateProductImageDTO,
  ): Promise<ProductImages> {
    const productImage = new ProductImages();
    productImage.image_url = createProductImageDto.image_url;
    // Chuyển đổi product_id thành số
    const productId = Number(createProductImageDto.product_id);
    productImage.product = await this.productsRepository.findOneOrFail({
      where: { id: productId },
    });

    return await this.productImageRepository.save(productImage);
  }

  async findAll(): Promise<ProductImages[]> {
    return this.productImageRepository.find({ relations: ['product'] });
  }

  async FindOne(id: number): Promise<ProductImages> {
    const productImage = await this.productImageRepository.findOne({
      where: { id },
      relations: ['product'],
    });
    if (!productImage) {
      throw new NotFoundException(`not found ${id}`);
    }
    return productImage;
  }
  async update(
    id: number,
    updateProductImageDTO: UpdateProductImageDTO,
  ): Promise<ProductImages> {
    const productImage = await this.FindOne(id); // Tìm hình ảnh trước khi cập nhật
    const updatedProductImage = Object.assign(
      productImage,
      updateProductImageDTO,
    ); // Cập nhật thông tin hình ảnh
    return this.productImageRepository.save(updatedProductImage); // Lưu thay đổi vào cơ sở dữ liệu
  }

  async remove(id: number): Promise<void> {
    const productImage = await this.FindOne(id); // Kiểm tra hình ảnh trước khi xóa
    await this.productImageRepository.remove(productImage); // Xóa hình ảnh khỏi cơ sở dữ liệu
  }
}
