import { InjectionToken } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Periodic } from '../core/api/periodic.service';

/**
 * Global application state.
 */
export interface GlobalState {
  periodic: Periodic[];
}

/**
 * Inject token with GlobalState.
 */
export const GLOBAL_RX_STATE = new InjectionToken<RxState<GlobalState>>(
  'GLOBAL_RX_STATE'
);
