import { Body, Controller, Get, NotFoundException, Put } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';

@Controller('/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Put('/')
  async updateProfile(@Body() body: { bio: string; name: string }) {
    const address = '0x0000000000000000000000000000000000000000'; // TODO: get address from token
    await this.profileService.updateProfile({
      address,
      bio: body.bio,
      name: body.name,
    });
    return { statusCode: 201 };
  }

  @Get('/')
  async getProfile() {
    const address = '0x0000000000000000000000000000000000000000'; // TODO: get address from token
    const profile = await this.profileService.getProfile(address);
    if (!profile) throw new NotFoundException();
    return { profile };
  }
}
