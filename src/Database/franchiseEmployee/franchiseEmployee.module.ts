import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Franchise_employees } from 'src/Entities/franchiseEmployees.entity';
import { Franchises } from 'src/Entities/franchises.entity';
import { User } from 'src/Entities/user.entity';
import { FranchiseEmployeeController } from './Controller/franchise.controller';
import { FranchiseEmployeeService } from './service/franchiseEmployee.service';

@Module({
  imports: [TypeOrmModule.forFeature([Franchises, User, Franchise_employees])],
  controllers: [FranchiseEmployeeController],
  providers: [FranchiseEmployeeService],
  exports: [FranchiseEmployeeService],
})
export class FranchiseEmployeeModule {}
