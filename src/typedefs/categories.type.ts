import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class CategoriesType {
  @Field()
  id: number;

  @Field()
  title: string;
}
