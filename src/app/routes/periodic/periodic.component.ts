import { Component } from '@angular/core';
import { TableComponent } from '../../core/components/table/table.component';

@Component({
  selector: 'app-periodic',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './periodic.component.html',
})
export class PeriodicComponent {}
