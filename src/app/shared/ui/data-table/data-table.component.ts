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
        <table class="min-w-full divide-y divide-slate-200">
          <thead class="bg-slate-50">
            <tr>
              @for (column of columns(); track column.key) {
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {{ column.label }}
                </th>
              }
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 bg-white">
            @for (row of rows(); track $index) {
              <tr class="hover:bg-slate-50/80">
                @for (column of columns(); track column.key) {
                  <td class="px-4 py-4 text-sm text-slate-700">{{ row[column.key] }}</td>
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
