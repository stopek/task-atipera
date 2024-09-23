import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestBuilderService {
  constructor(protected httpClient: HttpClient) {}

  public asset<T>(path: string): Observable<T> {
    return this.httpClient.get<T>('database/' + path + '.json');
  }
}
