import App from '@/app';
import validateEnv from '@utils/validateEnv';

import { AuthResolver } from '@resolvers/auth.resolver';
import { UserResolver } from '@resolvers/users.resolver';
import { CategoryResolver } from '@resolvers/categories.resolver';

validateEnv();

const app = new App([AuthResolver, UserResolver, CategoryResolver]);

app.listen();
