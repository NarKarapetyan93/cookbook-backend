import { Model, ModelObject } from 'objection';
import { Category } from '@interfaces/categories.interface';

export class CategoryModel extends Model implements Category {
  id!: number;
  title: string;
  static tableName = 'categories'; // database table name
  static idColumn = 'id'; // id column name
}

export type CategoriesShape = ModelObject<CategoryModel>;
