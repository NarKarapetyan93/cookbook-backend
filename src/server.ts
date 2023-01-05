import App from '@/app';
import validateEnv from '@utils/validateEnv';

import { AuthResolver } from '@resolvers/auth.resolver';
import { UserResolver } from '@resolvers/users.resolver';

validateEnv();

const app = new App([AuthResolver, UserResolver]);

app.listen();
