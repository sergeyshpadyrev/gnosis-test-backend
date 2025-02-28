import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';

const siweGuard = new (AuthGuard('siwe'))();
export const AuthRequired = () => UseGuards(siweGuard);
