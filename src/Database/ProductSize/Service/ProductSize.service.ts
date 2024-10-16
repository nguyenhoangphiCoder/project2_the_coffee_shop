import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductSize } from 'src/Entities/productSize.entity';
import { Repository } from 'typeorm';
import {
  CreateProductSizeDTO,
  UpdateProductSizeDTO,
} from '../DTO/ProductSize.dto';
import { Product } from 'src/Entities/Product.entity';

@Injectable()
export class ProductSizeService {
  constructor(
    @InjectRepository(ProductSize)
    private productSizeRepository: Repository<ProductSize>,
  ) {}

  async create(
    createProductSizeDto: CreateProductSizeDTO,
  ): Promise<ProductSize> {
    const productSize = new ProductSize();
    productSize.products = { id: createProductSizeDto.product_id } as Product; // Chỉ cần gán đối tượng Product
    productSize.size = createProductSizeDto.size;
    productSize.price_adjustment = createProductSizeDto.price_adjustment;
    return await this.productSizeRepository.save(productSize);
  }

  async findAll(): Promise<ProductSize[]> {
    return this.productSizeRepository.find();
  }

  async findOne(id: number): Promise<ProductSize> {
    const productSize = await this.productSizeRepository.findOne({
      where: { id },
    });
    if (!productSize) {
      throw new NotFoundException(`Product size not found with id: ${id}`);
    }
    return productSize;
  }

  async update(
    id: number,
    updateProductSizeDto: UpdateProductSizeDTO,
  ): Promise<ProductSize> {
    const productSize = await this.findOne(id);
    Object.assign(productSize, updateProductSizeDto);
    return this.productSizeRepository.save(productSize);
  }

  async remove(id: number): Promise<ProductSize> {
    const productSize = await this.findOne(id);
    await this.productSizeRepository.remove(productSize);
    return productSize; // hoặc có thể trả về một thông điệp xác nhận
  }
}
