import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ProductFormValue, ProductModalState, ProductStatus } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form-modal',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-form-modal.component.html',
  styleUrl: './product-form-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormModalComponent {
  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductService);
  private readonly dialogRef = inject(MatDialogRef<ProductFormModalComponent>);
  private readonly modalState = inject<ProductModalState>(MAT_DIALOG_DATA);

  protected readonly modalTitle = computed(() =>
    this.modalState.mode === 'edit' ? 'Editar producto' : 'Alta Producto'
  );
  protected readonly modalDescription = computed(() =>
    this.modalState.mode === 'edit'
      ? 'Revisa y ajusta el producto mock seleccionado antes de la futura integracion con la API.'
      : 'Prepara un nuevo producto mock con una estructura lista para conectar luego con la API.'
  );
  protected readonly submitLabel = computed(() =>
    this.modalState.mode === 'edit' ? 'Guardar cambios' : 'Confirmar alta'
  );

  protected readonly form = this.fb.nonNullable.group({
    sku: ['', [Validators.required, Validators.maxLength(20)]],
    name: ['', [Validators.required, Validators.maxLength(120)]],
    category: ['', [Validators.required, Validators.maxLength(80)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    price: [0, [Validators.required, Validators.min(0)]],
    status: ['active' as ProductStatus, [Validators.required]],
    description: ['', [Validators.maxLength(300)]]
  });

  constructor() {
    this.syncForm();
  }

  protected closeModal(): void {
    this.dialogRef.close();
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

  private syncForm(): void {
    const formValue: ProductFormValue = this.modalState.product
      ? {
          sku: this.modalState.product.sku,
          name: this.modalState.product.name,
          category: this.modalState.product.category,
          stock: this.modalState.product.stock,
          price: this.modalState.product.price,
          status: this.modalState.product.status,
          description: this.modalState.product.description
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
