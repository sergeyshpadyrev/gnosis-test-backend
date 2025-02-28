import { AuthService } from '../services/auth.service';
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/')
  async authenticate(@Body() body: { message: string; signature: string }) {
    const token = await this.authService.authenticate(body);
    if (!token) throw new UnauthorizedException();
    return { token };
  }
}
