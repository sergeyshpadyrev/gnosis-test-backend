import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/authenticate')
  async authenticate(@Body() body: { message: string; signature: string }) {
    const token = await this.appService.authenticate(body);
    if (!token) throw new UnauthorizedException();
    return { token };
  }
}
