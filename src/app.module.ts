import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '../ormconfig';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserModule } from './Database/Users/user.module';
import { PasswordResetTokenModule } from './Database/passwordResetTokens/passwordResetToken.module';
import { AddressModule } from './Database/address/address.module';
import { PromotionModule } from './Database/Promotion/promotion.module';
import { FranchiseModule } from './Database/franchises/franchise.module';
import { FranchiseEmployeeModule } from './Database/franchiseEmployee/franchiseEmployee.module';
import { CategoryModule } from './Database/categories/category.module';
import { productModule } from './Database/Products/Product.module';
import { ProductSizeMOdule } from './Database/ProductSize/ProductSize.module';
import { ToppingModule } from './Database/Topping/Topping.module';
import { ProductPromotionModule } from './Database/ProductPromotions/productpromotion.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...DatabaseConfig,
      autoLoadEntities: true,
      logging: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
    }),
    UserModule,
    PasswordResetTokenModule,
    AddressModule,
    PromotionModule,
    FranchiseModule,
    FranchiseEmployeeModule,
    CategoryModule,
    productModule,
    ProductSizeMOdule,
    ToppingModule,
    ProductPromotionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
