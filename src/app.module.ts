import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SiweStrategy } from './auth';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'siwe' })],
  controllers: [AppController],
  providers: [AppService, SiweStrategy],
})
export class AppModule {}
