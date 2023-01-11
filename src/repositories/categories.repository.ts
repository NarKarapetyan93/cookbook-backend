import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CategoriesInterface } from '@interfaces/categories.interface';
import { CategoriesModel } from '@models/categories.model';
import { CreateCategoryDto } from '@dtos/categories.dto';

export default class CategoriesRepository {
  public async categoryFindAll(): Promise<CategoriesInterface[]> {
    const categories: CategoriesInterface[] = await CategoriesModel.query().select().from('categories');
    return categories;
  }

  public async categoryFindById(categoryId: number): Promise<CategoriesInterface> {
    const findCategory: CategoriesInterface = await CategoriesModel.query().findById(categoryId);
    if (!findCategory) throw new HttpException(409, "You're not user");

    return findCategory;
  }

  public async categoryCreate(categoryData: CreateCategoryDto): Promise<CategoriesInterface> {
    if (isEmpty(categoryData)) throw new HttpException(400, "You're not categoryData");

    const findCategory: CategoriesInterface = await CategoriesModel.query().select().from('categories').where('title', '=', categoryData.title).first();
    if (findCategory) throw new HttpException(409, `CategoriesInterface with title "${categoryData.title}" already exists`);

    const createCategoryData: CategoriesInterface = await CategoriesModel.query().insert(categoryData).into('categories');

    return createCategoryData;
  }

  public async categoryUpdate(categoryId: number, categoryData: CreateCategoryDto): Promise<CategoriesInterface> {
    if (isEmpty(categoryData)) throw new HttpException(400, "You're not userData");

    const findCategory: CategoriesInterface[] = await CategoriesModel.query().select().from('categories').where('id', '=', categoryId);
    if (!findCategory) throw new HttpException(409, 'CategoriesInterface does not exists');

    await CategoriesModel.query().update(categoryData).where('id', '=', categoryId).into('categories');

    const updateCategoryData: CategoriesInterface = await CategoriesModel.query().select().from('categories').where('id', '=', categoryId).first();
    return updateCategoryData;
  }

  public async categoryDelete(categoryId: number): Promise<CategoriesInterface> {
    const findCategory: CategoriesInterface = await CategoriesModel.query().select().from('categories').where('id', '=', categoryId).first();
    if (!findCategory) throw new HttpException(409, 'CategoriesInterface does not exists');

    await CategoriesModel.query().delete().where('id', '=', categoryId).into('categories');
    return findCategory;
  }
}
