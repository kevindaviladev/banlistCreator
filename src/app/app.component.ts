import { Component, OnInit } from '@angular/core';
import { CardsService } from './services/cards.service';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  map,
} from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Card } from './interfaces/card.interface';
import {
  CdkDragDrop,
  CdkDragExit,
  copyArrayItem,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { collectionData } from 'rxfire/firestore';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'banlistCreator';
  cardName = new FormControl('');

  bannedList: Card[] = [];
  limitedList: Card[] = [];
  semiLimitedList: Card[] = [];
  unlimitedList: Card[] = [];
  cardResultsList: Card[] = [];
  constructor(private cardService: CardsService) {}

  async ngOnInit() {
    this.cardName.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(async (cardName) => {
        if (cardName) {
          this.cardResultsList = await this.searchCard(cardName);
          console.log(this.cardResultsList);
        }
      });

    this.getList().subscribe((res: any) => {
      // this.bannedList = res;
      this.bannedList = res[0].data;
    });
    // console.log(ga);
  }

  async searchCard(cardName: string) {
    const response = await this.cardService.getCard(cardName).toPromise();
    return response;
  }

  dropOnList(event: CdkDragDrop<Card[]>) {
    // console.log(event);
    // if (event.previousContainer === event.container) {
    //   moveItemInArray(
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex
    //   );
    // } else {
    //   transferArrayItem(
    //     event.previousContainer.data,
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex
    //   );
    // }
    //Obtenemos el elemento
    const element = (event.previousContainer.data as Array<Card>)[
      event.previousIndex
    ];
    //Comprobamos que no exista este elemento en el array
    const isExist = (event.container.data as Array<Card>).includes(element);

    if (!isExist)
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
  }

  print() {
    console.log('banned', this.bannedList);
    console.log('limited', this.limitedList);
    console.log('semilimited', this.semiLimitedList);
    console.log('unlimited', this.unlimitedList);

    this.setList();
  }

  getList() {
    const res = this.cardService.getList('banned');
    return res;
  }

  setList() {
    this.cardService.setList('banned', this.bannedList);
  }
}
