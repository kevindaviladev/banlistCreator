import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { collectionChanges, collectionData } from 'rxfire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Card } from '../interfaces/card.interface';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private _YGO_API = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

  constructor(
    private http: HttpClient,
    private firestore: Firestore,
    private _fireStore: AngularFirestore
  ) {}

  getCard(cardName: string): Observable<Card[]> {
    const params = new HttpParams().set('fname', cardName);
    return this.http
      .get<Card[]>(`${this._YGO_API}`, { params })
      .pipe(map((res: any) => res.data));
  }

  getList(listName: string): Observable<Card[]> {
    // const collect = collection(this.firestore, listName);
    return this._fireStore.collection<Card>(listName).valueChanges();
    // return this._fireStore.collection(listName);
  }

  setList(listName: string, data: Array<any>) {
    // const collect = collection(this.firestore, listName);
    // collectionChanges(collect, data).subscribe(console.log);
    this._fireStore
      .collection(listName)
      .doc('MaOkl9i6M88DZMnOoJrJ')
      .update({ data });
  }
}
