import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtendedUser } from 'src/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User as AuthUser, UserModule as AuthModule } from '@hilma/auth-nest';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([ExtendedUser, AuthUser]), AuthModule, JwtModule.register({})],
  controllers: [UserController],
  providers: [UserService,
    { provide: "UserService", useExisting: UserService },
    { provide: "USER_MODULE_OPTIONS", useValue: {} }
  ],
  exports: [UserService]
})
export class UserModule { }
