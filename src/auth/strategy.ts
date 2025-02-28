import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { Request } from 'express';
import { SiweMessage } from 'siwe';

@Injectable()
export class SiweStrategy extends PassportStrategy(Strategy, 'siwe') {
  constructor() {
    super();
  }

  async validate(req: Request): Promise<any> {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException();
      }

      const token = authHeader.split(' ')[1];
      if (!token) throw new UnauthorizedException();

      const decodedToken = Buffer.from(token, 'base64').toString();
      if (!decodedToken) throw new UnauthorizedException();

      const tokenData = JSON.parse(decodedToken);

      const siweMessage = new SiweMessage(tokenData.message);
      const verified = await siweMessage.verify({
        signature: tokenData.signature,
      });
      if (!verified.success) throw new UnauthorizedException();

      return { address: siweMessage.address };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
