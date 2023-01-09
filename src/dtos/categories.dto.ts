import { InputType, Field } from 'type-graphql';
import { IsString } from 'class-validator';
import { CategoryObjectType } from '@typedefs/categories.type';

@InputType()
export class CreateCategoryDto implements Partial<CategoryObjectType> {
  @Field()
  @IsString()
  title: string;
}
