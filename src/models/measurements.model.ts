import { Model, ModelObject } from 'objection';
import { MeasurementsInterface } from '@interfaces/measurements.interface';

export class MeasurementsModel extends Model implements MeasurementsInterface {
  id!: number;
  title: string;
  static tableName = 'measurements'; // database table name
  static idColumn = 'id'; // id column name
}

export type CategoriesShape = ModelObject<MeasurementsModel>;
