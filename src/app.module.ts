import { Module } from '@nestjs/common';
import { ProfileService } from './services/profile.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { ProfileController } from './controllers/profile.controller';

@Module({
  imports: [],
  controllers: [AuthController, ProfileController],
  providers: [AuthService, ProfileService],
})
export class AppModule {}
