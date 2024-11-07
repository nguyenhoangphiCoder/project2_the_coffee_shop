import { Delete, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductsDTO } from 'src/Database/Products/DTO/Products.dto';
import { ProductCategories } from 'src/Entities/productcategories.emtity';
import { Repository } from 'typeorm';
import {
  CreateProductCategoriesDTO,
  UpdateProductCategoriesDTO,
} from '../DTO/ProductCtaegories.dto';
import { Categories } from 'src/Entities/categories.entity';
import { Product } from 'src/Entities/Product.entity';
import { mergeWith } from 'rxjs';

@Injectable()
export class productCategoryService {
  constructor(
    @InjectRepository(ProductCategories)
    private productCategoriesRepository: Repository<ProductCategories>,
    @InjectRepository(Categories)
    private categoryRepository: Repository<Categories>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(
    CreateProductCategoriesDTO: CreateProductCategoriesDTO,
  ): Promise<ProductCategories> {
    const productCategories = this.productCategoriesRepository.create({
      category: { id: CreateProductCategoriesDTO.category_id },
      product: { id: CreateProductCategoriesDTO.product_id },
    });
    return this.productCategoriesRepository.save(productCategories);
  }

  async FindAll(): Promise<ProductCategories[]> {
    return this.productCategoriesRepository.find({
      relations: ['product', 'category'],
    });
  }

  async FindOne(id: number): Promise<ProductCategories> {
    return this.productCategoriesRepository.findOne({
      where: { id },
      relations: ['category', 'product'],
    });
  }
  async FindOneBy(category_id: number): Promise<Product[]> {
    // Kiểm tra xem danh mục có tồn tại không
    const categoryExists = await this.categoryRepository.findOne({
      where: { id: category_id },
    });

    if (!categoryExists) {
      throw new Error('Category not found');
    }

    // Trả về các sản phẩm thuộc danh mục này
    const productCategories = await this.productCategoriesRepository.find({
      where: { category: { id: category_id } },
      relations: ['product'], // Lấy thông tin sản phẩm qua quan hệ product
    });

    return productCategories.map((pc) => pc.product); // Trả về danh sách các sản phẩm
  }

  async update(
    id: number,
    UpdateProductCategoriesDTO: UpdateProductCategoriesDTO,
  ): Promise<ProductCategories> {
    const productCategories = await this.FindOne(id);
    if (!productCategories) {
      throw new Error('not found');
    }
    // tim categories tu categories_id
    const category = await this.categoryRepository.findOne({
      where: { id: UpdateProductCategoriesDTO.category_id },
    });
    if (!category) {
      throw new Error('not found');
    }

    // tim product tu product_id
    const Product = await this.productRepository.findOne({
      where: { id: UpdateProductCategoriesDTO.product_id },
    });
    if (!Product) {
      throw new Error('not found');
    }
    productCategories.category = category;
    productCategories.product = Product;
    return this.productCategoriesRepository.save(productCategories);
  }

  async remove(id: number): Promise<void> {
    await this.productCategoriesRepository.delete(id);
  }
}
