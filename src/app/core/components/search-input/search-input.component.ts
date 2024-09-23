import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  Subject,
  switchMap,
} from 'rxjs';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent implements OnInit {
  /**
   * Form Model value
   * @protected
   */
  protected query = '';

  /**
   * Emitter for input text.
   */
  @Output() changeInput = new EventEmitter<string>();

  /**
   * Subject for listen changes on input.
   *
   * @private
   */
  private inputSubject = new Subject<string>();

  /**
   * Clear input and emit value
   */
  clearInput(): void {
    this.query = '';
    this.changeInput.emit('');
  }

  /**
   * OnChange input handler.
   *
   * @param event
   * @protected
   */
  protected onChange(event: Event): void {
    const input = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.inputSubject.next(input);
  }

  /**
   * Listen input and emit value after x seconds.
   *
   * @private
   */
  private listenInput(): void {
    this.inputSubject
      .pipe(
        debounceTime(environment.DELAY_SEARCH),
        distinctUntilChanged(),
        switchMap(value => {
          this.changeInput.emit(value);
          return EMPTY;
        })
      )
      .subscribe();
  }

  /**
   * Lifecycle after init component.
   */
  ngOnInit(): void {
    this.listenInput();
  }
}
