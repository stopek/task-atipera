import { Component, Inject, inject } from '@angular/core';
import { AsyncPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Periodic } from '../../api/periodic.service';
import { LoaderComponent } from '../loader/loader.component';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { SearchInputComponent } from '../search-input/search-input.component';
import { RxState } from '@rx-angular/state';
import { GLOBAL_RX_STATE, GlobalState } from '../../../store/rx-state';

interface PeriodicState {
  periodic: Periodic[];
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    AsyncPipe,
    MatTableModule,
    NgIf,
    NgOptimizedImage,
    LoaderComponent,
    MatIcon,
    MatButtonModule,
    SearchInputComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent extends RxState<PeriodicState> {
  /**
   * Periodic data loaded from api to store
   */
  readonly data$ = this.select('periodic');

  /**
   * Column list to table header
   * @protected
   */
  protected columns: (keyof Periodic)[] = [
    'position',
    'name',
    'weight',
    'symbol',
  ];

  /**
   * Injected SnackBar.
   * @private
   */
  private readonly snackBar = inject(MatSnackBar);

  /**
   * Injected MatDialog.
   * @private
   */
  private readonly dialog = inject(MatDialog);

  constructor(
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>
  ) {
    super();

    this.connect('periodic', this.globalState.select('periodic'));
  }

  onInput(input: string): void {
    console.log(input);
  }

  /**
   * Open dialog action.
   *
   * @param item
   * @param key
   * @protected
   */
  protected openDialog(item: Periodic, key: keyof Periodic): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { item, key },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', [result, item]);
      if (result !== undefined) {
        const reduceFn = (oldState: GlobalState) =>
          oldState.periodic.map(data =>
            data.position === item.position ? { ...data, [key]: result } : data
          );

        this.globalState.set('periodic', reduceFn);

        this.snackBar.open('Element was changed successfully', 'Close', {
          panelClass: 'style-success',
        });
      }
    });
  }
}
