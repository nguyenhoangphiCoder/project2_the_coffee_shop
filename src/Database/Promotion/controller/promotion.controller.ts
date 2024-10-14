import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Promotion } from 'src/Entities/promotions.entity';
import { PromotionService } from '../service/promotion.service';
import {
  CreatePromotionDTO,
  UpdatePromotionDTO,
} from '../DTO/createPromotion.dto';
import { updateUserDTO } from 'src/Database/Users/DTO/updateUser.dto';

@Controller('promotions')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}
  @Post()
  create(@Body() CreatePromotionDTO: CreatePromotionDTO) {
    return this.promotionService.create(CreatePromotionDTO);
  }
  @Get()
  findAll() {
    return this.promotionService.findAll();
  }
  @Get(':id') // Route để lấy thông tin promotion theo ID
  async findOne(@Param('id') id: string): Promise<Promotion> {
    const promotionId = +id;
    if (isNaN(promotionId)) {
      throw new NotFoundException(`Invalid ID: ${id}`); // Thêm kiểm tra cho ID không hợp lệ
    }

    const promotion = await this.promotionService.findOne(promotionId);
    if (!promotion) {
      throw new NotFoundException(`Promotion with ID ${promotionId} not found`);
    }
    return promotion;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdatePromotionDTO: UpdatePromotionDTO,
  ) {
    return this.promotionService.update(+id, UpdatePromotionDTO);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promotionService.remove(+id);
  }
}
