import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethod } from 'src/Entities/paymentMethod.entity';
import { PaymentMethodController } from './Controller/paymentMethod.controller';
import { PaymentMethodService } from './Service/paymentmethod.service';
import { UserModule } from '../Users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethod]), UserModule],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService],
  exports: [PaymentMethodService],
})
export class PaymentMethodsModule {}
