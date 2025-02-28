import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SiweStrategy } from './auth';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PassportModule.register({ defaultStrategy: 'siwe' })],
  controllers: [AppController],
  providers: [AppService, DatabaseService, SiweStrategy],
})
export class AppModule {}
