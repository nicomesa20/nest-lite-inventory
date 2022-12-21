import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles: string[] = this.reflector.get<string[]>('roles', context.getHandler())
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user } = request;
    if (!this.hasRole(roles, user.role)) {
      throw new UnauthorizedException();
    }
    return true;
  }

  hasRole(rolesAllowed: string[], roleInToken: number): boolean {
    for (const role of rolesAllowed) {
      if (role === roleInToken.toString()) {
        return true;
      }
    }
    return false;
  }
}