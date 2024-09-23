import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RequestBuilderService } from '../services/request-builder.service';

export interface Periodic {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

@Injectable({
  providedIn: 'root',
})
export class PeriodicService {
  constructor(private _builder: RequestBuilderService) {}

  /**
   * Fetch all periodic data
   */
  fetchAll(): Observable<Periodic[]> {
    return this._builder.asset<Periodic[]>('db');
  }
}
