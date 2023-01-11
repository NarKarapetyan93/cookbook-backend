import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { MeasurementsInterface } from '@interfaces/measurements.interface';
import { MeasurementsModel } from '@models/measurements.model';
import { CreateMeasurementDto } from '@dtos/measurements.dto';

export default class MeasurementsRepository {
  public async measurementFindAll(): Promise<MeasurementsInterface[]> {
    const measurements: MeasurementsInterface[] = await MeasurementsModel.query().select().from('measurements');
    return measurements;
  }

  public async measurementFindById(measurementId: number): Promise<MeasurementsInterface> {
    const findMeasurement: MeasurementsInterface = await MeasurementsModel.query().findById(measurementId);
    if (!findMeasurement) throw new HttpException(409, "You're not user");

    return findMeasurement;
  }

  public async measurementCreate(measurementData: CreateMeasurementDto): Promise<MeasurementsInterface> {
    if (isEmpty(measurementData)) throw new HttpException(400, "You're not measurementData");

    const findMeasurement: MeasurementsInterface = await MeasurementsModel.query()
      .select()
      .from('measurements')
      .where('title', '=', measurementData.title)
      .first();
    if (findMeasurement) throw new HttpException(409, `MeasurementsInterface with title "${measurementData.title}" already exists`);

    const createMeasurementData: MeasurementsInterface = await MeasurementsModel.query().insert(measurementData).into('measurements');

    return createMeasurementData;
  }

  public async measurementUpdate(measurementId: number, measurementData: CreateMeasurementDto): Promise<MeasurementsInterface> {
    if (isEmpty(measurementData)) throw new HttpException(400, "You're not userData");

    const findMeasurement: MeasurementsInterface[] = await MeasurementsModel.query().select().from('measurements').where('id', '=', measurementId);
    if (!findMeasurement) throw new HttpException(409, 'MeasurementsInterface does not exists');

    await MeasurementsModel.query().update(measurementData).where('id', '=', measurementId).into('measurements');

    const updateMeasurementData: MeasurementsInterface = await MeasurementsModel.query()
      .select()
      .from('measurements')
      .where('id', '=', measurementId)
      .first();
    return updateMeasurementData;
  }

  public async measurementDelete(measurementId: number): Promise<MeasurementsInterface> {
    const findMeasurement: MeasurementsInterface = await MeasurementsModel.query()
      .select()
      .from('measurements')
      .where('id', '=', measurementId)
      .first();
    if (!findMeasurement) throw new HttpException(409, 'MeasurementsInterface does not exists');

    await MeasurementsModel.query().delete().where('id', '=', measurementId).into('measurements');
    return findMeasurement;
  }
}
