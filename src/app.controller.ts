import { AppService } from './app.service';
import { AuthRequired, User, UserType } from './auth';
import { Body, Controller, Get, Put } from '@nestjs/common';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health/check')
  async getHealthCheck() {
    return { statusCode: 200 };
  }

  @AuthRequired()
  @Get('/profile')
  async getProfile(@User() user: UserType) {
    const profile = await this.appService.getProfile(user.address);
    return { profile };
  }

  @AuthRequired()
  @Put('/profile')
  async updateProfile(@Body() body: { bio: string; name: string }, @User() user: UserType) {
    await this.appService.updateProfile({
      address: user.address,
      bio: body.bio,
      name: body.name,
    });
    return { statusCode: 201 };
  }
}
