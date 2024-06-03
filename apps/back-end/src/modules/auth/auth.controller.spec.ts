import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { jwtConstants } from '@config/constants/constants';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthMock } from '@mocks/testingMocks';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/shopify-favorites'),
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1h' },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, LocalStrategy, JwtStrategy],
      exports: [AuthService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('Authentication Flow - It should work as expected', () => {
    it('SignUp - It needs to create the user and return the User and Access Token', async () => {
      jest
        .spyOn(authController, 'signUp')
        .mockImplementation(async () => AuthMock.userSession);

      expect(await authController.signUp(AuthMock.authPayload)).toBe(
        AuthMock.userSession,
      );
    });

    it('SignIn - It needs to authenticate the user and return the User and Access Token', async () => {
      jest
        .spyOn(authController, 'signIn')
        .mockImplementation(async () => AuthMock.userSession);

      expect(await authController.signIn(AuthMock.authPayload)).toBe(
        AuthMock.userSession,
      );
    });
  });
});
