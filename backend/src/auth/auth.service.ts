import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { PrismaService } from '../prisma/prisma.service'

import { jwtConstants } from '@/shared/constants'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(email: string, password: string) {
    // Step 1: Fetch a user with the given email
    const user = await this.prisma.user.findUnique({ where: { email: email } })

    // If no user is found, throw an error
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`)
    }

    // Step 2: Check if the password is correct
    const isPasswordValid = user.password === password

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password')
    }
    const payload: JwtPayload = {
      email,
      userId: user.id,
      username: user.username,
    }

    // Step 3: Generate a JWT containing the user's ID and return it
    return {
      accessToken: this.jwtService.sign(payload, jwtConstants),
    }
  }

  async validateUser(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({ where: { email } })

    if (!user || user.password !== pass) return null

    const { password: _, ...result } = user

    return result
  }
}