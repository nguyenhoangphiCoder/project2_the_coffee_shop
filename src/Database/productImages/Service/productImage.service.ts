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
    const productId = Number(createProductImageDto.product_id);
    productImage.product = await this.productsRepository.findOneOrFail({
      where: { id: productId },
    });

    return await this.productImageRepository.save(productImage);
  }

  async findAll(): Promise<ProductImages[]> {
    return this.productImageRepository.find({ relations: ['product'] });
  }

  async findOne(id: number): Promise<ProductImages> {
    const productImage = await this.productImageRepository.findOne({
      where: { id },
      relations: ['product'],
    });
    if (!productImage) {
      throw new NotFoundException(`Product image not found with ID ${id}`);
    }
    return productImage;
  }

  // Thêm phương thức tìm kiếm theo productId
  async findByProductId(productId: number): Promise<ProductImages[]> {
    const productImages = await this.productImageRepository.find({
      where: { product: { id: productId } },
      relations: ['product'],
    });

    if (!productImages || productImages.length === 0) {
      throw new NotFoundException(
        `No images found for product ID ${productId}`,
      );
    }

    return productImages;
  }

  async update(
    id: number,
    updateProductImageDTO: UpdateProductImageDTO,
  ): Promise<ProductImages> {
    const productImage = await this.findOne(id);
    const updatedProductImage = Object.assign(
      productImage,
      updateProductImageDTO,
    );
    return this.productImageRepository.save(updatedProductImage);
  }

  async remove(id: number): Promise<void> {
    const productImage = await this.findOne(id);
    await this.productImageRepository.remove(productImage);
  }
}
