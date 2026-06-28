import { AuthEffects } from '../core/auth/store/auth.effects';
import { ProductsEffects } from '../features/products/store/products.effects';

export const appEffects = [AuthEffects, ProductsEffects];
