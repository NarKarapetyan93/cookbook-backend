import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@models/users.model';
import { isEmpty } from '@utils/util';

export default class UserRepository {
  public async userFindAll(): Promise<User[]> {
    const users: User[] = await UserModel.query().select().from('users');
    return users;
  }

  public async userFindById(userId: number): Promise<User> {
    const findUser: User = await UserModel.query().findById(userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async userCreate(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await UserModel.query().select().from('users').where('email', '=', userData.email).first();
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await UserModel.query()
      .insert({ ...userData, password: hashedPassword })
      .into('users');

    return createUserData;
  }

  public async userUpdate(userId: number, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User[] = await UserModel.query().select().from('users').where('id', '=', userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    const hashedPassword = await hash(userData.password, 10);
    await UserModel.query()
      .update({ ...userData, password: hashedPassword })
      .where('id', '=', userId)
      .into('users');

    const updateUserData: User = await UserModel.query().select().from('users').where('id', '=', userId).first();
    return updateUserData;
  }

  public async userDelete(userId: number): Promise<User> {
    const findUser: User = await UserModel.query().select().from('users').where('id', '=', userId).first();
    if (!findUser) throw new HttpException(409, "You're not user");

    await UserModel.query().delete().where('id', '=', userId).into('users');
    return findUser;
  }
}
