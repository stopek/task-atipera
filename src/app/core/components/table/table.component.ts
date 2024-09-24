import { Component, Inject, inject, ViewChild } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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
import { MatInput } from '@angular/material/input';
import { map, Observable } from 'rxjs';

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
    NgForOf,
    MatInput,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent extends RxState<PeriodicState> {
  /**
   * Periodic data loaded from api to store
   */
  readonly data$: Observable<Periodic[]> = this.select('periodic');

  /**
   * Data source in the type of "TableDataSource" with filtering
   * @protected
   */
  protected dataSource$: Observable<MatTableDataSource<Periodic>> =
    this.data$.pipe(map(items => new MatTableDataSource<Periodic>(items)));

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
   * Access to the SearchInput component directly
   */
  @ViewChild(SearchInputComponent) inputComponent!: SearchInputComponent;

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

  /**
   * Filter in the Material Table, called when the `DataSource.filter` is changed.
   *
   * @param data
   * @param query
   */
  private createFilter(data: Periodic, query: string) {
    const found = Object.values(data).some(item =>
      item.toString().toLowerCase().includes(query)
    );

    const message = `Search query "${query}" in ${JSON.stringify(data)}`;
    console.log(`${message} -> ${found}`);

    return found;
  }

  /**
   * Event handler to catch input changes.
   *
   * @param query
   */
  protected onInput(query: string): void {
    console.log(`Filter table with "${query}" value`);

    this.dataSource$ = this.data$.pipe(
      map(items => {
        const dataSource = new MatTableDataSource<Periodic>(items);

        dataSource.filterPredicate = this.createFilter;
        dataSource.filter = query;

        return dataSource;
      })
    );
  }

  /**
   * Clear search input (e.g. after edit).
   *
   * @private
   */
  private clearSearch(): void {
    this.inputComponent.clearInput();
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

      enterAnimationDuration: 300,
      exitAnimationDuration: 200,
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', [result, item]);
      this.clearSearch();

      if (result === undefined) {
        return;
      }

      const reduceFn = (oldState: GlobalState) =>
        oldState.periodic.map(data =>
          data.position === item.position ? { ...data, [key]: result } : data
        );

      this.globalState.set('periodic', reduceFn);

      this.snackBar.open('Element was changed successfully', 'Close', {
        panelClass: 'style-success',
      });
    });
  }
}
