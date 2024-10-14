import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { userService } from '../Service/user.service';
import { createUserDTO } from '../DTO/createdUser.dto';
import { updateUserDTO } from '../DTO/updateUser.dto';

@Controller('users')
export class userControllers {
  constructor(private readonly userService: userService) {} // Inject service vào controller
  @Post()
  create(@Body() createUserDTO: createUserDTO) {
    // du lieu duoc lay tu body cuar request
    return this.userService.create(createUserDTO); //goi user de tao nguoi dung moi
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
