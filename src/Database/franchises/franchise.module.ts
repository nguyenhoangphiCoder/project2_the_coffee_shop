import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Franchises } from 'src/Entities/franchises.entity';
import { User } from 'src/Entities/user.entity';
import { FranchisesController } from './Controller/franchise.controller';
import { FranchiseService } from './Service/franchise.service';
import { Product } from 'src/Entities/Product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Franchises, User, Product])],
  controllers: [FranchisesController],
  providers: [FranchiseService],
  exports: [FranchiseService],
})
export class FranchiseModule {}
