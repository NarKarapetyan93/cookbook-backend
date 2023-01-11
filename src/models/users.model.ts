import { Model, ModelObject } from 'objection';
import { UsersInterface } from '@interfaces/users.interface';

export class UsersModel extends Model implements UsersInterface {
  id!: number;
  firstname?: string;
  lastname?: string;
  birth_year?: number;
  email!: string;
  password!: string;
  static tableName = 'users'; // database table name
  static idColumn = 'id'; // id column name
}

export type UsersShape = ModelObject<UsersModel>;
