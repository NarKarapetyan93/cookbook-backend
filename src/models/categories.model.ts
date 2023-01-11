import { Model, ModelObject } from 'objection';
import { CategoriesInterface } from '@interfaces/categories.interface';

export class CategoriesModel extends Model implements CategoriesInterface {
  id!: number;
  title: string;
  static tableName = 'categories'; // database table name
  static idColumn = 'id'; // id column name
}

export type CategoriesShape = ModelObject<CategoriesModel>;
