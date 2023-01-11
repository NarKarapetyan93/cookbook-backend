import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import IngredientsRepository from '@repositories/ingredients.repository';
import { IngredientsType } from '@typedefs/ingredients.type';
import { CreateIngredientDto } from '@dtos/ingredients.dto';

@Resolver()
export class IngredientsResolver extends IngredientsRepository {
  @Query(() => [IngredientsType], {
    description: 'Ingredient find list',
  })
  async getIngredients(): Promise<IngredientsType[]> {
    const categories: IngredientsType[] = await this.ingredientFindAll();
    return categories;
  }

  @Query(() => IngredientsType, {
    description: 'Ingredient find by id',
  })
  async getIngredientById(@Arg('ingredientId') ingredientId: number): Promise<IngredientsType> {
    const ingredient: IngredientsType = await this.ingredientFindById(ingredientId);
    return ingredient;
  }

  @Mutation(() => IngredientsType, {
    description: 'Ingredient create',
  })
  async createIngredient(@Arg('ingredientData') ingredientData: CreateIngredientDto): Promise<IngredientsType> {
    const ingredient: IngredientsType = await this.ingredientCreate(ingredientData);
    return ingredient;
  }

  @Mutation(() => IngredientsType, {
    description: 'Ingredient update',
  })
  async updateIngredient(
    @Arg('ingredientId') ingredientId: number,
    @Arg('ingredientData') ingredientData: CreateIngredientDto,
  ): Promise<IngredientsType> {
    const ingredient: IngredientsType = await this.ingredientUpdate(ingredientId, ingredientData);
    return ingredient;
  }

  @Mutation(() => IngredientsType, {
    description: 'Ingredient delete',
  })
  async deleteIngredient(@Arg('ingredientId') ingredientId: number): Promise<IngredientsType> {
    const ingredient: IngredientsType = await this.ingredientDelete(ingredientId);
    return ingredient;
  }
}
