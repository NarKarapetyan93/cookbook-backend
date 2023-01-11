import { InputType, Field } from 'type-graphql';
import { IsString } from 'class-validator';
import { IngredientsType } from '@typedefs/ingredients.type';

@InputType()
export class CreateIngredientDto implements Partial<IngredientsType> {
  @Field()
  @IsString()
  title: string;
}
