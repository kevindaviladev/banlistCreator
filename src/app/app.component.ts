import { Component, OnInit } from '@angular/core';
import { CardsService } from './services/cards.service';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs/operators';
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
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'banlistCreator';
  cardName = new FormControl('');

  bannedList: Card[] = [];
  cardResultsList: Card[] = [];

  // cardNameSubscription: Subscription = new Subscription();

  constructor(private cardService: CardsService) {}

  ngOnInit(): void {
    this.cardName.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(async (cardName) => {
        if (cardName) {
          this.cardResultsList = await this.searchCard(cardName);
          console.log(this.cardResultsList);
        }
      });
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
    console.log(this.bannedList);
  }
}
