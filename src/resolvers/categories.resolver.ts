import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import CategoryRepository from '@repositories/categories.repository';
import { CategoryObjectType } from '@typedefs/categories.type';
import { CreateCategoryDto } from '@dtos/categories.dto';

@Resolver()
export class CategoryResolver extends CategoryRepository {
  @Query(() => [CategoryObjectType], {
    description: 'Category find list',
  })
  async getCategories(): Promise<CategoryObjectType[]> {
    const categories: CategoryObjectType[] = await this.categoryFindAll();
    return categories;
  }

  @Query(() => CategoryObjectType, {
    description: 'Category find by id',
  })
  async getCategoryById(@Arg('categoryId') categoryId: number): Promise<CategoryObjectType> {
    const category: CategoryObjectType = await this.categoryFindById(categoryId);
    return category;
  }

  @Mutation(() => CategoryObjectType, {
    description: 'Category create',
  })
  async createCategory(@Arg('categoryData') categoryData: CreateCategoryDto): Promise<CategoryObjectType> {
    const category: CategoryObjectType = await this.categoryCreate(categoryData);
    return category;
  }

  @Mutation(() => CategoryObjectType, {
    description: 'Category update',
  })
  async updateCategory(@Arg('categoryId') categoryId: number, @Arg('categoryData') categoryData: CreateCategoryDto): Promise<CategoryObjectType> {
    const category: CategoryObjectType = await this.categoryUpdate(categoryId, categoryData);
    return category;
  }

  @Mutation(() => CategoryObjectType, {
    description: 'Category delete',
  })
  async deleteCategory(@Arg('categoryId') categoryId: number): Promise<CategoryObjectType> {
    const category: CategoryObjectType = await this.categoryDelete(categoryId);
    return category;
  }
}
