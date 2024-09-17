import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';

@Controller('users')
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User>{
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body(new ValidationPipe) user: User): Promise<User>{
    return this.userService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user:Partial<User>):Promise<User>{
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string>{
    return this.userService.remove(id);
  }
}
