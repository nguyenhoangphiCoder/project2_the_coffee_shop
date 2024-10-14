import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { passwordResetTokenService } from '../Service/passwordResetTokens.service';
import { CreatePassWordResetTokensDTO } from '../DTO/createPasswordResetTokens.dto';

@Controller('password_reset_tokens')
export class passwordResetTokenController {
  constructor(
    private readonly passwordResetTokenService: passwordResetTokenService,
  ) {}
  //api taoj moiws token dat lai mk

  @Post()
  async create(
    @Body() CreatePassWordResetTokensDTO: CreatePassWordResetTokensDTO,
  ) {
    return this.passwordResetTokenService.create(CreatePassWordResetTokensDTO);
  }

  //api de xoa token dua tren id
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.passwordResetTokenService.remove(+id);
  }
}
