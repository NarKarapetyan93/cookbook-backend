import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class CategoryObjectType {
  @Field()
  id: number;

  @Field()
  title: string;
}
