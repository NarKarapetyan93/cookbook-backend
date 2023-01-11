import { Model, ModelObject } from 'objection';
import { IngredientsInterface } from '@interfaces/ingredients.interface';

export class IngredientsModel extends Model implements IngredientsInterface {
  id!: number;
  title: string;
  static tableName = 'ingredients'; // database table name
  static idColumn = 'id'; // id column name
}

export type CategoriesShape = ModelObject<IngredientsModel>;
