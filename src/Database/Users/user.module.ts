import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Entities/user.entity';
import { userControllers } from './Controller/user.controller';
import { userService } from './Service/user.service';
import { AuthService } from './Service/Auth.service'; // Nếu không nhập từ module khác
import { passwordResetTokens } from 'src/Entities/passwordResetTokens.entity';
import { addresses } from 'src/Entities/address.entity';
import { Franchises } from 'src/Entities/franchises.entity';
import { Franchise_employees } from 'src/Entities/franchiseEmployees.entity';
import { PaymentMethod } from 'src/Entities/paymentMethod.entity';
import { Orders } from 'src/Entities/Orders.entity';
import { Carts } from 'src/Entities/cart.entity';
import { OrderItems } from 'src/Entities/orderItems.entity';
import { AuthModule } from './Auth.Module';
// Nhập AuthModule

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      passwordResetTokens,
      addresses,
      Franchises,
      Franchise_employees,
      PaymentMethod,
      Orders,
      Carts,
      OrderItems,
    ]),
    AuthModule, // Nhập AuthModule ở đây
  ],
  controllers: [userControllers],
  providers: [userService, AuthService],
  exports: [userService, TypeOrmModule, AuthService],
})
export class UserModule {}
