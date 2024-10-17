import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Toppings } from 'src/Entities/topping.entity';
import { Repository } from 'typeorm';
import { CreateToppingDTO, UpdateToppingDTO } from '../DTO/createTopping.dto';

@Injectable()
export class ToppingService {
  constructor(
    @InjectRepository(Toppings)
    private toppingRepository: Repository<Toppings>,
  ) {}

  async create(CreateToppingDTO: CreateToppingDTO): Promise<Toppings> {
    const toppings = this.toppingRepository.create(CreateToppingDTO);
    return this.toppingRepository.save(toppings);
  }

  async findAll(): Promise<Toppings[]> {
    return this.toppingRepository.find();
  }

  async findOne(id: number): Promise<Toppings> {
    const topping = await this.toppingRepository.findOne({ where: { id } });
    if (!topping) {
      throw new NotFoundException(`not found ${id}`);
    }
    return topping;
  }

  async update(
    id: number,
    UpdateToppingDTO: UpdateToppingDTO,
  ): Promise<Toppings> {
    const topping = await this.toppingRepository.findOne({ where: { id } });
    Object.assign(topping, UpdateToppingDTO); //cap nhat gia tri vao dto
    return this.toppingRepository.save(topping);
  }

  async remove(id: number): Promise<void> {
    const topping = await this.findOne(id);
    await this.toppingRepository.remove(topping);
  }
}
