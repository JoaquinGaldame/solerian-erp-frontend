import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { ProductFormModalComponent } from '../components/product-form-modal/product-form-modal.component';
import { Product, ProductModalState } from '../models/product.model';

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prd-100',
    sku: 'PRD-100',
    name: 'Bomba centrifuga',
    category: 'Equipos',
    stock: 18,
    price: 1450,
    status: 'active',
    description: 'Bomba industrial preparada para operaciones comerciales y de servicio.'
  },
  {
    id: 'prd-104',
    sku: 'PRD-104',
    name: 'Filtro de linea',
    category: 'Repuestos',
    stock: 6,
    price: 220,
    status: 'low-stock',
    description: 'Componente de filtrado en linea para flujos de mantenimiento preventivo.'
  },
  {
    id: 'prd-208',
    sku: 'PRD-208',
    name: 'Tablero de control',
    category: 'Automatizacion',
    stock: 11,
    price: 3890,
    status: 'draft',
    description: 'Tablero programable con especificaciones temporales de referencia.'
  }
];

const initialModalState: ProductModalState = {
  isOpen: false,
  mode: 'create',
  product: null
};

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly dialog = inject(MatDialog);
  private readonly modalStateSubject = new BehaviorSubject<ProductModalState>(initialModalState);

  readonly modalState$ = this.modalStateSubject.asObservable();

  loadProducts(): Observable<Product[]> {
    return of(MOCK_PRODUCTS).pipe(delay(250));
  }

  openCreateModal(): void {
    const state: ProductModalState = {
      isOpen: true,
      mode: 'create',
      product: null
    };

    this.modalStateSubject.next(state);
    this.openDialog(state);
  }

  openEditModal(product: Product): void {
    const state: ProductModalState = {
      isOpen: true,
      mode: 'edit',
      product
    };

    this.modalStateSubject.next(state);
    this.openDialog(state);
  }

  closeModal(): void {
    this.dialog.closeAll();
    this.modalStateSubject.next(initialModalState);
  }

  // TODO: Reemplazar este placeholder por un POST real y despachar acciones de exito o error.
  createProduct(): Observable<void> {
    return of(void 0).pipe(delay(250));
  }

  // TODO: Reemplazar este placeholder por un PUT/PATCH real y despachar acciones de exito o error.
  updateProduct(): Observable<void> {
    return of(void 0).pipe(delay(250));
  }

  private openDialog(state: ProductModalState): void {
    this.dialog.closeAll();

    const dialogRef = this.dialog.open(ProductFormModalComponent, {
      data: state,
      width: 'min(100vw - 2rem, 48rem)',
      maxWidth: '48rem',
      maxHeight: 'calc(100dvh - 2rem)',
      autoFocus: false,
      panelClass: 'erp-product-dialog',
      backdropClass: 'erp-dialog-backdrop'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.modalStateSubject.next(initialModalState);
    });
  }
}
