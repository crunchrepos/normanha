import {
  Request,
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayloadDTO } from './database/auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  signUp(@Body() signUpDto: AuthPayloadDTO) {
    return this.authService.signUp(signUpDto.email, signUpDto.password);
  }

  @HttpCode(HttpStatus.OK)
  // Local Auth Guard handles the user validation
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  signIn(@Request() req) {
    const { user } = req;
    return this.authService.signIn(user);
  }
}
