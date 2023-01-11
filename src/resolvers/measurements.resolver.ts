import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import MeasurementsRepository from '@repositories/measurements.repository';
import { MeasurementsType } from '@typedefs/measurements.type';
import { CreateMeasurementDto } from '@dtos/measurements.dto';

@Resolver()
export class MeasurementsResolver extends MeasurementsRepository {
  @Query(() => [MeasurementsType], {
    description: 'Measurement find list',
  })
  async getMeasurements(): Promise<MeasurementsType[]> {
    const categories: MeasurementsType[] = await this.measurementFindAll();
    return categories;
  }

  @Query(() => MeasurementsType, {
    description: 'Measurement find by id',
  })
  async getMeasurementById(@Arg('measurementId') measurementId: number): Promise<MeasurementsType> {
    const measurement: MeasurementsType = await this.measurementFindById(measurementId);
    return measurement;
  }

  @Mutation(() => MeasurementsType, {
    description: 'Measurement create',
  })
  async createMeasurement(@Arg('measurementData') measurementData: CreateMeasurementDto): Promise<MeasurementsType> {
    const measurement: MeasurementsType = await this.measurementCreate(measurementData);
    return measurement;
  }

  @Mutation(() => MeasurementsType, {
    description: 'Measurement update',
  })
  async updateMeasurement(
    @Arg('measurementId') measurementId: number,
    @Arg('measurementData') measurementData: CreateMeasurementDto,
  ): Promise<MeasurementsType> {
    const measurement: MeasurementsType = await this.measurementUpdate(measurementId, measurementData);
    return measurement;
  }

  @Mutation(() => MeasurementsType, {
    description: 'Measurement delete',
  })
  async deleteMeasurement(@Arg('measurementId') measurementId: number): Promise<MeasurementsType> {
    const measurement: MeasurementsType = await this.measurementDelete(measurementId);
    return measurement;
  }
}
