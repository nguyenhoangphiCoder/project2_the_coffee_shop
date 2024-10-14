import { createUserDTO } from './createdUser.dto';
import { PartialType } from '@nestjs/mapped-types';

//cap nhat nguoi dung ,ke thua createUserDTO vaf bien tat car thanh tuy chonj
export class updateUserDTO extends PartialType(createUserDTO) {}
