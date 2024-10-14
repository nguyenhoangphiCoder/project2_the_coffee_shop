import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { passwordResetTokens } from 'src/Entities/passwordResetTokens.entity';
import { User } from 'src/Entities/user.entity';
import { passwordResetTokenController } from './Controller/passwordResetToken.controller';
import { passwordResetTokenService } from './Service/passwordResetTokens.service';

@Module({
  imports: [TypeOrmModule.forFeature([passwordResetTokens, User])],
  controllers: [passwordResetTokenController],
  providers: [passwordResetTokenService],
  exports: [passwordResetTokenService],
})
export class PasswordResetTokenModule {}
