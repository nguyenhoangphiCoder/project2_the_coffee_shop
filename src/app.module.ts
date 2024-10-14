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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
