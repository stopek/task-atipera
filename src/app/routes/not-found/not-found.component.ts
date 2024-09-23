import { Component } from '@angular/core';
import { ErrorComponent } from '../../core/components/error/error.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [ErrorComponent],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {}
