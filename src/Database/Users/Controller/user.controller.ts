import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  Session,
} from '@nestjs/common';
import { userService } from '../Service/user.service';
import { createUserDTO } from '../DTO/createdUser.dto';
import { updateUserDTO } from '../DTO/updateUser.dto';
import { AuthService } from '../Service/Auth.service';
import { SignInDTO } from '../DTO/signIn.Dto';

@Controller('users')
export class userControllers {
  constructor(
    private readonly userService: userService,
    private readonly authService: AuthService,
  ) {} // Inject service vào controller
  @Post()
  create(@Body() createUserDTO: createUserDTO) {
    // du lieu duoc lay tu body cuar request
    return this.userService.create(createUserDTO); //goi user de tao nguoi dung moi
  }
  // sign up
  @Post('sign-up')
  async signUp(@Body() createUserDTO: createUserDTO) {
    return await this.authService.signUp(createUserDTO);
  }
  //sing in
  @Post('sign-in')
  async signIn(
    @Body() SignInDTO: SignInDTO,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.authService.signIn(
      SignInDTO.email,
      SignInDTO.password,
    );
    // Kiểm tra xem session có tồn tại không
    if (!session) {
      throw new Error('Session not found');
    }
    session.user_id = user.id;
    return 'login successfully';
  }
  @Post('sign-out')
  signOut(@Session() session: Record<string, any>) {
    delete session.userId;
    return 'Sign out successfully!';
  }
  @Post('forgot-password')
  async forgotPassword() {
    return 'return password via email';
  }
  // phuong thuc get
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id); //goi service de lay nguoi dung theo id
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDTO: updateUserDTO) {
    return this.userService.update(+id, updateUserDTO);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
