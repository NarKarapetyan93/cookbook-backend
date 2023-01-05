import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { CreateUserDto } from '@dtos/users.dto';
import AuthRepository from '@repositories/auth.repository';
import { UserObjectType } from '@typedefs/users.type';

@Resolver()
export class AuthResolver extends AuthRepository {
  @Mutation(() => UserObjectType, {
    description: 'User signup',
  })
  async signup(@Arg('userData') userData: CreateUserDto): Promise<UserObjectType> {
    return this.userSignUp(userData);
  }

  @Mutation(() => UserObjectType, {
    description: 'User login',
  })
  async login(@Arg('userData') userData: CreateUserDto): Promise<UserObjectType> {
    const { findUser, tokenData } = await this.userLogIn(userData);
    return { ...findUser, tokenData: tokenData.token };
  }

  @Authorized()
  @Mutation(() => UserObjectType, {
    description: 'User logout',
  })
  async logout(@Ctx('user') userData: any): Promise<UserObjectType> {
    return this.userLogOut(userData);
  }
}
