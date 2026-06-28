import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface DataTableColumn {
  key: string;
  label: string;
}

export type DataTableRow = Record<string, string | number>;

@Component({
  selector: 'app-data-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="panel overflow-hidden">
      <div class="overflow-x-auto">
        <table class="table-shell min-w-full divide-y">
          <thead class="table-head">
            <tr>
              @for (column of columns(); track column.key) {
                <th class="text-app-soft px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em]">
                  {{ column.label }}
                </th>
              }
            </tr>
          </thead>
          <tbody class="table-shell divide-y">
            @for (row of rows(); track $index) {
              <tr class="table-row">
                @for (column of columns(); track column.key) {
                  <td class="text-app px-4 py-4 text-sm">{{ row[column.key] }}</td>
                }
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class DataTableComponent {
  readonly columns = input.required<DataTableColumn[]>();
  readonly rows = input.required<DataTableRow[]>();
}
