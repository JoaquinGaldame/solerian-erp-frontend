import { Product } from '../models/product.model';

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

export const initialProductsState: ProductsState = {
  items: [],
  loading: false,
  error: null
};
