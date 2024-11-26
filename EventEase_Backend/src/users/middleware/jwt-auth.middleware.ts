import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: any, res: any, next: () => void) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization header missing or malformed');
    }

    const token = authHeader.split(' ')[1]; // Extract the token from 'Bearer <token>'

    try {
      const payload = this.jwtService.verify(token);
      req.user = payload; // Attach decoded user information to the request
      next(); // Proceed to the next middleware or controller
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
