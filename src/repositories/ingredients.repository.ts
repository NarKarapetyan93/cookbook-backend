import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { IngredientsInterface } from '@interfaces/ingredients.interface';
import { IngredientsModel } from '@models/ingredients.model';
import { CreateIngredientDto } from '@dtos/ingredients.dto';

export default class IngredientsRepository {
  public async ingredientFindAll(): Promise<IngredientsInterface[]> {
    const ingredients: IngredientsInterface[] = await IngredientsModel.query().select().from('ingredients');
    return ingredients;
  }

  public async ingredientFindById(ingredientId: number): Promise<IngredientsInterface> {
    const findIngredient: IngredientsInterface = await IngredientsModel.query().findById(ingredientId);
    if (!findIngredient) throw new HttpException(409, "You're not user");

    return findIngredient;
  }

  public async ingredientCreate(ingredientData: CreateIngredientDto): Promise<IngredientsInterface> {
    if (isEmpty(ingredientData)) throw new HttpException(400, "You're not ingredientData");

    const findIngredient: IngredientsInterface = await IngredientsModel.query()
      .select()
      .from('ingredients')
      .where('title', '=', ingredientData.title)
      .first();
    if (findIngredient) throw new HttpException(409, `IngredientsInterface with title "${ingredientData.title}" already exists`);

    const createIngredientData: IngredientsInterface = await IngredientsModel.query().insert(ingredientData).into('ingredients');

    return createIngredientData;
  }

  public async ingredientUpdate(ingredientId: number, ingredientData: CreateIngredientDto): Promise<IngredientsInterface> {
    if (isEmpty(ingredientData)) throw new HttpException(400, "You're not userData");

    const findIngredient: IngredientsInterface[] = await IngredientsModel.query().select().from('ingredients').where('id', '=', ingredientId);
    if (!findIngredient) throw new HttpException(409, 'IngredientsInterface does not exists');

    await IngredientsModel.query().update(ingredientData).where('id', '=', ingredientId).into('ingredients');

    const updateIngredientData: IngredientsInterface = await IngredientsModel.query()
      .select()
      .from('ingredients')
      .where('id', '=', ingredientId)
      .first();
    return updateIngredientData;
  }

  public async ingredientDelete(ingredientId: number): Promise<IngredientsInterface> {
    const findIngredient: IngredientsInterface = await IngredientsModel.query().select().from('ingredients').where('id', '=', ingredientId).first();
    if (!findIngredient) throw new HttpException(409, 'IngredientsInterface does not exists');

    await IngredientsModel.query().delete().where('id', '=', ingredientId).into('ingredients');
    return findIngredient;
  }
}
