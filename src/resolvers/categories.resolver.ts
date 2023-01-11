import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import CategoriesRepository from '@repositories/categories.repository';
import { CategoriesType } from '@typedefs/categories.type';
import { CreateCategoryDto } from '@dtos/categories.dto';

@Resolver()
export class CategoriesResolver extends CategoriesRepository {
  @Query(() => [CategoriesType], {
    description: 'Category find list',
  })
  async getCategories(): Promise<CategoriesType[]> {
    const categories: CategoriesType[] = await this.categoryFindAll();
    return categories;
  }

  @Query(() => CategoriesType, {
    description: 'Category find by id',
  })
  async getCategoryById(@Arg('categoryId') categoryId: number): Promise<CategoriesType> {
    const category: CategoriesType = await this.categoryFindById(categoryId);
    return category;
  }

  @Mutation(() => CategoriesType, {
    description: 'Category create',
  })
  async createCategory(@Arg('categoryData') categoryData: CreateCategoryDto): Promise<CategoriesType> {
    const category: CategoriesType = await this.categoryCreate(categoryData);
    return category;
  }

  @Mutation(() => CategoriesType, {
    description: 'Category update',
  })
  async updateCategory(@Arg('categoryId') categoryId: number, @Arg('categoryData') categoryData: CreateCategoryDto): Promise<CategoriesType> {
    const category: CategoriesType = await this.categoryUpdate(categoryId, categoryData);
    return category;
  }

  @Mutation(() => CategoriesType, {
    description: 'Category delete',
  })
  async deleteCategory(@Arg('categoryId') categoryId: number): Promise<CategoriesType> {
    const category: CategoriesType = await this.categoryDelete(categoryId);
    return category;
  }
}
