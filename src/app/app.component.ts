import { Component, OnInit } from '@angular/core';
import { CardsService } from './services/cards.service';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Card } from './interfaces/card.interface';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'banlistCreator';
  cardName = new FormControl('');
  cardResultsList: Card[] = [];

  cardNameSubscription: Subscription = new Subscription();

  constructor(private cardService: CardsService) {}

  ngOnInit(): void {
    this.cardName.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(async (cardName) => {
        this.cardResultsList = await this.searchCard(cardName);
        console.log(this.cardResultsList);
      });
  }

  async searchCard(cardName: string) {
    const response = await this.cardService.getCard(cardName).toPromise();
    return response;
  }
}
