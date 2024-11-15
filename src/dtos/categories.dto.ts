import { InputType, Field } from 'type-graphql';
import { IsString } from 'class-validator';
import { CategoriesType } from '@typedefs/categories.type';

@InputType()
export class CreateCategoryDto implements Partial<CategoriesType> {
  @Field()
  @IsString()
  title: string;
}
