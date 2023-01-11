import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class IngredientsType {
  @Field()
  id: number;

  @Field()
  title: string;
}
