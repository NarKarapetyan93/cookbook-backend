import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Category } from '@interfaces/categories.interface';
import { CategoryModel } from '@models/categories.model';
import { CreateCategoryDto } from '@dtos/categories.dto';

export default class CategoryRepository {
  public async categoryFindAll(): Promise<Category[]> {
    const categories: Category[] = await CategoryModel.query().select().from('categories');
    return categories;
  }

  public async categoryFindById(categoryId: number): Promise<Category> {
    const findCategory: Category = await CategoryModel.query().findById(categoryId);
    if (!findCategory) throw new HttpException(409, "You're not user");

    return findCategory;
  }

  public async categoryCreate(categoryData: CreateCategoryDto): Promise<Category> {
    if (isEmpty(categoryData)) throw new HttpException(400, "You're not categoryData");

    const findCategory: Category = await CategoryModel.query().select().from('categories').where('title', '=', categoryData.title).first();
    if (findCategory) throw new HttpException(409, `Category with title "${categoryData.title}" already exists`);

    const createCategoryData: Category = await CategoryModel.query().insert(categoryData).into('categories');

    return createCategoryData;
  }

  public async categoryUpdate(categoryId: number, categoryData: CreateCategoryDto): Promise<Category> {
    if (isEmpty(categoryData)) throw new HttpException(400, "You're not userData");

    const findCategory: Category[] = await CategoryModel.query().select().from('categories').where('id', '=', categoryId);
    if (!findCategory) throw new HttpException(409, 'Category does not exists');

    await CategoryModel.query().update(categoryData).where('id', '=', categoryId).into('categories');

    const updateCategoryData: Category = await CategoryModel.query().select().from('categories').where('id', '=', categoryId).first();
    return updateCategoryData;
  }

  public async categoryDelete(categoryId: number): Promise<Category> {
    const findCategory: Category = await CategoryModel.query().select().from('categories').where('id', '=', categoryId).first();
    if (!findCategory) throw new HttpException(409, 'Category does not exists');

    await CategoryModel.query().delete().where('id', '=', categoryId).into('categories');
    return findCategory;
  }
}
