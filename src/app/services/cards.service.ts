import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Card } from '../interfaces/card.interface';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private _YGO_API = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

  constructor(private http: HttpClient) {}

  getCard(cardName: string): Observable<Card[]> {
    const params = new HttpParams().set('fname', cardName);
    return this.http
      .get<Card[]>(`${this._YGO_API}`, { params })
      .pipe(map((res: any) => res.data));
  }
}
