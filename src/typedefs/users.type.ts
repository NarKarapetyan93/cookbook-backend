import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class UsersType {
  @Field()
  id: number;

  @Field()
  firstname?: string;

  @Field()
  lastname?: string;

  @Field()
  birth_year?: number;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  tokenData?: string;
}
