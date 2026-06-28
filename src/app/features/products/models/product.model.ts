export type ProductStatus = 'active' | 'low-stock' | 'draft';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  status: ProductStatus;
  description: string;
}

export interface ProductFormValue {
  sku: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  status: ProductStatus;
  description: string;
}

export type ProductModalMode = 'create' | 'edit';

export interface ProductModalState {
  isOpen: boolean;
  mode: ProductModalMode;
  product: Product | null;
}
