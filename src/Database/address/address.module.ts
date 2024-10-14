import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { addresses } from 'src/Entities/address.entity';
import { User } from 'src/Entities/user.entity';
import { AddressesService } from './service/address.service'; // Sử dụng 'service' thay vì 'Service'
import { AddressesController } from './controller/address.controller';
import { UserModule } from '../Users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([addresses, User]), UserModule],
  providers: [AddressesService],
  controllers: [AddressesController],
  exports: [AddressesService],
})
export class AddressModule {}
