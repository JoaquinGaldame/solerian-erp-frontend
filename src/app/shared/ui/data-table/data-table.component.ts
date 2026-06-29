import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

export interface DataTableColumn {
  key: string;
  label: string;
}

export type DataTableRow = Record<string, string | number>;

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [MatCardModule, MatTableModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card class="panel overflow-hidden">
      <div class="overflow-x-auto">
        <table mat-table [dataSource]="rows()" class="erp-table min-w-full">
          @for (column of columns(); track column.key) {
            <ng-container [matColumnDef]="column.key">
              <th mat-header-cell *matHeaderCellDef>{{ column.label }}</th>
              <td mat-cell *matCellDef="let row" class="text-app text-sm">{{ row[column.key] }}</td>
            </ng-container>
          }

          <tr mat-header-row *matHeaderRowDef="displayedColumns()"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns()"></tr>
        </table>
      </div>
    </mat-card>
  `
})
export class DataTableComponent {
  readonly columns = input.required<DataTableColumn[]>();
  readonly rows = input.required<DataTableRow[]>();

  protected readonly displayedColumns = () => this.columns().map((column) => column.key);
}
