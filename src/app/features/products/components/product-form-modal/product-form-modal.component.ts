import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

import { Product, ProductFormValue } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form-modal',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './product-form-modal.component.html',
  styleUrl: './product-form-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormModalComponent {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly productService = inject(ProductService);

  protected readonly modalState$ = this.productService.modalState$;
  protected readonly modalTitle$ = this.modalState$.pipe(
    map((state) => (state.mode === 'edit' ? 'Editar producto' : 'Alta Producto'))
  );
  protected readonly modalDescription$ = this.modalState$.pipe(
    map((state) =>
      state.mode === 'edit'
        ? 'Revisa y ajusta el producto mock seleccionado antes de la futura integracion con la API.'
        : 'Prepara un nuevo producto mock con una estructura lista para conectar luego con la API.'
    )
  );
  protected readonly submitLabel$ = this.modalState$.pipe(
    map((state) => (state.mode === 'edit' ? 'Guardar cambios' : 'Confirmar alta'))
  );

  protected readonly form = this.fb.nonNullable.group({
    sku: ['', [Validators.required, Validators.maxLength(20)]],
    name: ['', [Validators.required, Validators.maxLength(120)]],
    category: ['', [Validators.required, Validators.maxLength(80)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    price: [0, [Validators.required, Validators.min(0)]],
    status: ['active' as Product['status'], [Validators.required]],
    description: ['', [Validators.maxLength(300)]]
  });

  constructor() {
    this.modalState$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => this.syncForm(state.product));
  }

  protected closeModal(): void {
    this.productService.closeModal();
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // TODO: Despachar acciones de alta/edicion de producto y conectar este flujo a effects contra API.
    this.closeModal();
  }

  private syncForm(product: Product | null): void {
    const formValue: ProductFormValue = product
      ? {
          sku: product.sku,
          name: product.name,
          category: product.category,
          stock: product.stock,
          price: product.price,
          status: product.status,
          description: product.description
        }
      : {
          sku: '',
          name: '',
          category: '',
          stock: 0,
          price: 0,
          status: 'active',
          description: ''
        };

    this.form.reset(formValue);
  }
}
