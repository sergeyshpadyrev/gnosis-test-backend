import { Injectable } from '@nestjs/common';
import { SiweMessage } from 'siwe';

@Injectable()
export class AuthService {
  async authenticate(props: { message: string; signature: string }) {
    const siweMessage = new SiweMessage(props.message);
    const verified = await siweMessage.verify({ signature: props.signature });

    if (!verified.success) return null;

    return 'token';
  }
}
