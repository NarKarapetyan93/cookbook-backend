import { InputType, Field } from 'type-graphql';
import { IsString } from 'class-validator';
import { MeasurementsType } from '@typedefs/measurements.type';

@InputType()
export class CreateMeasurementDto implements Partial<MeasurementsType> {
  @Field()
  @IsString()
  title: string;
}
