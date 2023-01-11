import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { UsersModel } from '@models/users.model';
import { HttpException } from '@exceptions/HttpException';
import { AuthResponse, DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { UsersInterface } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';

export default class AuthRepository {
  public async userSignUp(userData: CreateUserDto): Promise<UsersInterface> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: UsersModel = await UsersModel.query().select().from('users').where('email', '=', userData.email).first();
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: UsersInterface = await UsersModel.query()
      .insert({ ...userData, password: hashedPassword })
      .into('users');
    return createUserData;
  }

  public async userLogIn(userData: CreateUserDto): Promise<AuthResponse> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: UsersModel = await UsersModel.query().select().from('users').where('email', '=', userData.email).first();
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser, tokenData };
  }

  public async userLogOut(userId: number): Promise<UsersInterface> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: UsersInterface = await UsersModel.query().select().from('users').where('id', '=', userId).first();
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public createToken(user: UsersInterface): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}
