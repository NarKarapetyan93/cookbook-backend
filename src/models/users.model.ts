import { Model, ModelObject } from 'objection';
import { User } from '@interfaces/users.interface';

export class UserModel extends Model implements User {
  id!: number;
  firstname?: string;
  lastname?: string;
  birth_year?: number;
  email!: string;
  password!: string;
  static tableName = 'users'; // database table name
  static idColumn = 'id'; // id column name
}

export type UsersShape = ModelObject<UserModel>;
