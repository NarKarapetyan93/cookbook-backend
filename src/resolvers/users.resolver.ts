import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { CreateUserDto } from '@dtos/users.dto';
import UserRepository from '@repositories/users.repository';
import { UserObjectType } from '@typedefs/users.type';

@Resolver()
export class UserResolver extends UserRepository {
  @Query(() => [UserObjectType], {
    description: 'User find list',
  })
  async getUsers(): Promise<UserObjectType[]> {
    const users: UserObjectType[] = await this.userFindAll();
    return users;
  }

  @Query(() => UserObjectType, {
    description: 'User find by id',
  })
  async getUserById(@Arg('userId') userId: number): Promise<UserObjectType> {
    const user: UserObjectType = await this.userFindById(userId);
    return user;
  }

  @Mutation(() => UserObjectType, {
    description: 'User create',
  })
  async createUser(@Arg('userData') userData: CreateUserDto): Promise<UserObjectType> {
    const user: UserObjectType = await this.userCreate(userData);
    return user;
  }

  @Mutation(() => UserObjectType, {
    description: 'User update',
  })
  async updateUser(@Arg('userId') userId: number, @Arg('userData') userData: CreateUserDto): Promise<UserObjectType> {
    const user: UserObjectType = await this.userUpdate(userId, userData);
    return user;
  }

  @Mutation(() => UserObjectType, {
    description: 'User delete',
  })
  async deleteUser(@Arg('userId') userId: number): Promise<UserObjectType> {
    const user: UserObjectType = await this.userDelete(userId);
    return user;
  }
}
