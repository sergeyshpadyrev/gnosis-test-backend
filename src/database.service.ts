import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  constructor(private configService: ConfigService) {}

  private getBinId() {
    return this.configService.get('BIN_ID');
  }

  private getBinKey() {
    return this.configService.get('BIN_KEY');
  }

  private getBaseUrl() {
    return `https://api.jsonbin.io/v3/b/${this.getBinId()}`;
  }

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'X-Bin-Meta': 'false',
      'X-Bin-Versioning': 'false',
      'X-Master-Key': this.getBinKey(),
    };
  }

  private async readBin() {
    const response = await fetch(this.getBaseUrl(), {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  }

  private async updateBin(newData: any) {
    const response = await fetch(this.getBaseUrl(), {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(newData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
  }

  async readProfile(address: string) {
    const data = (await this.readBin()) as { [key: string]: { bio: string; name: string } };
    return data[address] as { bio: string; name: string } | undefined;
  }

  async updateProfile(address: string, bio: string, name: string) {
    const data = (await this.readBin()) as { [key: string]: { bio: string; name: string } };
    data[address] = { bio, name };
    await this.updateBin(data);
  }
}
