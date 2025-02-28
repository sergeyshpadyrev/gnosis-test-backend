import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Injectable()
export class AppService {
  constructor(private databaseService: DatabaseService) {}

  async getProfile(address: string) {
    return this.databaseService.readProfile(address);
  }

  async updateProfile(props: { address: string; bio: string; name: string }) {
    await this.databaseService.updateProfile(props.address, props.bio, props.name);
  }
}
