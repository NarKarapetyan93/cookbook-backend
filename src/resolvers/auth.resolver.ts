import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { CreateUserDto } from '@dtos/users.dto';
import AuthRepository from '@repositories/auth.repository';
import { UsersType } from '@typedefs/users.type';

@Resolver()
export class AuthResolver extends AuthRepository {
  @Mutation(() => UsersType, {
    description: 'UsersInterface signup',
  })
  async signup(@Arg('userData') userData: CreateUserDto): Promise<UsersType> {
    return this.userSignUp(userData);
  }

  @Mutation(() => UsersType, {
    description: 'UsersInterface login',
  })
  async login(@Arg('userData') userData: CreateUserDto): Promise<UsersType> {
    const { findUser, tokenData } = await this.userLogIn(userData);
    return { ...findUser, tokenData: tokenData.token };
  }

  @Authorized()
  @Mutation(() => UsersType, {
    description: 'UsersInterface logout',
  })
  async logout(@Ctx('user') userData: any): Promise<UsersType> {
    return this.userLogOut(userData);
  }
}
