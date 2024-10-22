import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/Entities/Product.entity';
import { Like, Repository, DataSource } from 'typeorm';
import { CreateProductsDTO, UpdateProductsDTO } from '../DTO/Products.dto';
import { Franchises } from 'src/Entities/franchises.entity';
import { ProductCategories } from 'src/Entities/productcategories.emtity';
import { ProductImages } from 'src/Entities/productImage.entity';
import { OrderItems } from 'src/Entities/orderItems.entity';
import { CartItems } from 'src/Entities/cartItems.entity';
import { ProductPromotions } from 'src/Entities/productPromotion.entity';
import { ProductSize } from 'src/Entities/productSize.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly ProductRepository: Repository<Product>,
    @InjectRepository(ProductSize)
    private readonly ProductSizeRepository: Repository<ProductSize>,
    @InjectRepository(Franchises)
    private readonly FranchiseRepository: Repository<Franchises>,
    @InjectRepository(ProductCategories)
    private readonly ProductCategoriesRepository: Repository<ProductCategories>,
    @InjectRepository(ProductPromotions)
    private readonly ProductPromotionRepository: Repository<ProductPromotions>,
    @InjectRepository(ProductImages)
    private readonly ProductImagesRepository: Repository<ProductImages>,
    @InjectRepository(OrderItems)
    private readonly OrderItemsRepository: Repository<OrderItems>,
    @InjectRepository(CartItems)
    private readonly CartItemsRepository: Repository<CartItems>,
    private readonly dataSource: DataSource, // Thêm vào đây
  ) {}

  // Liệt kê tất cả sản phẩm
  async findAll(): Promise<Product[]> {
    return await this.ProductRepository.find();
  }

  // Liệt kê sản phẩm theo id
  async findOne(id: number): Promise<Product> {
    const product = await this.ProductRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Not found product with id ${id}`);
    }
    return product;
  }

  // Tạo một sản phẩm mới
  async create(CreateProductsDTO: CreateProductsDTO): Promise<Product> {
    const franchise = await this.FranchiseRepository.findOne({
      where: { id: CreateProductsDTO.franchise_id },
    });
    if (!franchise) {
      throw new NotFoundException('Franchise not found');
    }
    const product = this.ProductRepository.create({
      ...CreateProductsDTO,
      franchises: franchise,
    });
    return this.ProductRepository.save(product);
  }

  // Cập nhật thông tin sản phẩm
  async update(
    id: number,
    UpdateProductsDTO: UpdateProductsDTO,
  ): Promise<Product> {
    const product = await this.findOne(id); // Kiểm tra sản phẩm có tồn tại

    // Xử lý để ánh xạ đến entity Franchise
    if (UpdateProductsDTO.franchise_id) {
      const franchise = await this.FranchiseRepository.findOne({
        where: { id: UpdateProductsDTO.franchise_id },
      });

      if (!franchise) {
        throw new NotFoundException(
          `Franchise with ID ${UpdateProductsDTO.franchise_id} not found`,
        );
      }

      product.franchises = franchise;
    }

    // Cập nhật các trường khác
    Object.assign(product, UpdateProductsDTO);
    return await this.ProductRepository.save(product);
  }

  // Xóa sản phẩm
  async remove(id: number): Promise<void> {
    // Tìm sản phẩm theo id
    const product = await this.ProductRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Xóa các bản ghi trong tất cả các bảng liên quan
    await this.ProductCategoriesRepository.delete({ product }); // Sử dụng đúng thuộc tính `product`
    await this.ProductImagesRepository.delete({ product });
    await this.OrderItemsRepository.delete({ product });
    await this.CartItemsRepository.delete({ product });
    await this.ProductPromotionRepository.delete({ products: product });
    await this.ProductSizeRepository.delete({ products: product });
    // Cuối cùng, xóa sản phẩm
    await this.ProductRepository.remove(product);
  }

  // Tìm kiếm sản phẩm theo tên
  async findByName(name: string): Promise<Product[]> {
    if (!name) {
      throw new BadRequestException('Name query parameter is required');
    }
    console.log('Searching for products with name:', name);
    return this.ProductRepository.find({
      where: { name: Like(`%${name}%`) },
      relations: ['categories'],
    });
  }
}
