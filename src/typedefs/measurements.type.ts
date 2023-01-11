import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class MeasurementsType {
  @Field()
  id: number;

  @Field()
  title: string;
}
