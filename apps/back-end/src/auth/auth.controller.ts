import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayloadDTO } from 'src/dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  signUp(@Body() signUpDto: AuthPayloadDTO) {
    return this.authService.signUp(signUpDto.email, signUpDto.password);
  }

  @HttpCode(HttpStatus.OK)
  // @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  signIn(@Body() signInDto: AuthPayloadDTO) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
