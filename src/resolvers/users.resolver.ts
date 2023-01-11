import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { CreateUserDto } from '@dtos/users.dto';
import UsersRepository from '@repositories/users.repository';
import { UsersType } from '@typedefs/users.type';

@Resolver()
export class UsersResolver extends UsersRepository {
  @Query(() => [UsersType], {
    description: 'Users find list',
  })
  async getUsers(): Promise<UsersType[]> {
    const users: UsersType[] = await this.userFindAll();
    return users;
  }

  @Query(() => UsersType, {
    description: 'Users find by id',
  })
  async getUserById(@Arg('userId') userId: number): Promise<UsersType> {
    const user: UsersType = await this.userFindById(userId);
    return user;
  }

  @Mutation(() => UsersType, {
    description: 'Users create',
  })
  async createUser(@Arg('userData') userData: CreateUserDto): Promise<UsersType> {
    const user: UsersType = await this.userCreate(userData);
    return user;
  }

  @Mutation(() => UsersType, {
    description: 'Users update',
  })
  async updateUser(@Arg('userId') userId: number, @Arg('userData') userData: CreateUserDto): Promise<UsersType> {
    const user: UsersType = await this.userUpdate(userId, userData);
    return user;
  }

  @Mutation(() => UsersType, {
    description: 'Users delete',
  })
  async deleteUser(@Arg('userId') userId: number): Promise<UsersType> {
    const user: UsersType = await this.userDelete(userId);
    return user;
  }
}
