import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators';
import { CheckAuthDto } from '../dtos/check-auth.dto';

export class AuthGuard implements CanActivate {
  constructor(
    @Inject('AUTHORIZATION_SERVICE')
    private readonly client: ClientProxy,
    private readonly configService: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const dto = new CheckAuthDto();
    dto.jwt = req.headers['authorization']?.split(' ')[1];
    dto.apiEndPoint =
      this.configService.get('PRODUCT_API_PREFIX') + req.originalUrl;
    dto.host = req.get('host');
    dto.protocol = req.protocol;
    dto.httpMethod = req.method;

    let isValid = false;
    try {
      isValid = await firstValueFrom(
        this.client.send(
          {
            cmd: 'checkAuthorization',
          },
          dto,
        ),
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    return isValid;
  }
}
