import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {
  /**
   * Main error header.
   */
  @Input() error = '';

  /**
   * Secondary error message.
   */
  @Input() message = '';
}
