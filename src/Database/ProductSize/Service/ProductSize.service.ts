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
    productSize.products = { id: createProductSizeDto.product_id } as Product;
    productSize.size = createProductSizeDto.size;

    // Kiểm tra kiểu dữ liệu và làm tròn price_adjustment
    const priceAdjustment = +createProductSizeDto.price_adjustment;
    if (isNaN(priceAdjustment)) {
      throw new HttpException(
        'Invalid price adjustment value',
        HttpStatus.BAD_REQUEST,
      );
    }
    productSize.price_adjustment = Math.floor(priceAdjustment);

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

    // Kiểm tra price_adjustment và làm tròn nếu cần
    if (updateProductSizeDto.price_adjustment !== undefined) {
      const priceAdjustment = +updateProductSizeDto.price_adjustment;
      if (isNaN(priceAdjustment)) {
        throw new HttpException(
          'Invalid price adjustment value',
          HttpStatus.BAD_REQUEST,
        );
      }
      console.log('Before floor:', priceAdjustment); // In giá trị trước khi làm tròn
      updateProductSizeDto.price_adjustment = Math.floor(priceAdjustment);
      console.log('After floor:', updateProductSizeDto.price_adjustment); // In giá trị sau khi làm tròn
    }

    // Cập nhật đối tượng productSize với dữ liệu mới
    Object.assign(productSize, updateProductSizeDto);

    // Lưu cập nhật vào cơ sở dữ liệu
    return this.productSizeRepository.save(productSize);
  }

  async remove(id: number): Promise<ProductSize> {
    const productSize = await this.findOne(id);
    await this.productSizeRepository.remove(productSize);
    return productSize; // Trả về product size đã bị xóa
  }
}
