import { Injectable } from '@nestjs/common';

const fakeDb: { [key: string]: { bio: string; name: string } } = {};

@Injectable()
export class ProfileService {
  async getProfile(address: string) {
    return fakeDb[address];
  }

  async updateProfile(props: { address: string; bio: string; name: string }) {
    fakeDb[props.address] = { bio: props.bio, name: props.name };
  }
}
