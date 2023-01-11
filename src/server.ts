import App from '@/app';
import validateEnv from '@utils/validateEnv';

import { AuthResolver } from '@resolvers/auth.resolver';
import { UsersResolver } from '@resolvers/users.resolver';
import { CategoriesResolver } from '@resolvers/categories.resolver';
import { IngredientsResolver } from '@resolvers/ingredients.resolver';
import { MeasurementsResolver } from '@resolvers/measurements.resolver';

validateEnv();

const app = new App([AuthResolver, UsersResolver, CategoriesResolver, IngredientsResolver, MeasurementsResolver]);

app.listen();
