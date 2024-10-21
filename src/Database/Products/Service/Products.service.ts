import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/Entities/Product.entity';
import { Like, Repository } from 'typeorm';
import { CreateProductsDTO, UpdateProductsDTO } from '../DTO/Products.dto';
import { Franchises } from 'src/Entities/franchises.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly ProductRepository: Repository<Product>,
    @InjectRepository(Franchises)
    private readonly FranchiseRepository: Repository<Franchises>,
  ) {}

  //liet ke tat ca sp
  async findAll(): Promise<Product[]> {
    return await this.ProductRepository.find();
  }

  // liet ke sp theo id
  async findOne(id: number): Promise<Product> {
    const product = await this.ProductRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`not found id ${id}`);
    }
    return product;
  }

  // tao 1 sp moi
  async create(CreateProductsDTO: CreateProductsDTO): Promise<Product> {
    const franchise = await this.FranchiseRepository.findOne({
      where: { id: CreateProductsDTO.franchise_id },
    });
    if (!franchise) {
      throw new NotFoundException('Franchise not found');
    }
    const product = this.ProductRepository.create({
      ...CreateProductsDTO, // Sử dụng DTO để khởi tạo sản phẩm
      franchises: franchise, // Gán franchise
    });
    return this.ProductRepository.save(product);
  }

  // cap nhat thong tin sp

  async update(
    id: number,
    UpdateProductsDTO: UpdateProductsDTO,
  ): Promise<Product> {
    const product = await this.findOne(id); // Kiểm tra sản phẩm có tồn tại

    //  xử lý để ánh xạ đến entity Franchise
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

  // xoa sp

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.ProductRepository.remove(product);
  }
  //tim kiem sp theo ten
  async findByName(name: number): Promise<Product[]> {
    if (!name) {
      throw new BadRequestException('Name query parameter is required');
    }
    console.log('Searching for products with name:', name);
    return this.ProductRepository.find({
      where: { name: Like(`%${name}%`) }, // Sử dụng Like để tìm kiếm
      relations: ['categories'],
    });
  }
}
