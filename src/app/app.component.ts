import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './core/components/menu/menu.component';
import { GLOBAL_RX_STATE, GlobalState } from './store/rx-state';
import { PeriodicService } from './core/api/periodic.service';
import { RxState } from '@rx-angular/state';
import { delay } from 'rxjs';
import { environment } from '../environments/environment';
import { LayoutComponent } from './core/components/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MenuComponent, LayoutComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(
    @Inject(GLOBAL_RX_STATE) private state: RxState<GlobalState>,
    private periodicService: PeriodicService
  ) {
    this.state.connect(
      'periodic',
      this.periodicService.fetchAll().pipe(delay(environment.DELAY_LOADING))
    );
  }
}
