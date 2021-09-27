import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/interfaces/card.interface';
import { CardsService } from 'src/app/services/cards.service';

@Component({
  selector: 'app-banlist',
  templateUrl: './banlist.component.html',
  styleUrls: ['./banlist.component.scss'],
})
export class BanlistComponent implements OnInit {
  bannedList: Card[] = [];
  limitedList: Card[] = [];
  semiLimitedList: Card[] = [];
  unlimitedList: Card[] = [];
  cardResultsList: Card[] = [];
  constructor(private cardService: CardsService) {}

  ngOnInit(): void {
    this.getList('banned').subscribe((res: any) => {
      // this.bannedList = res;
      console.log(res);
      if (res[0].data) this.bannedList = res[0].data;
    });

    this.getList('limited').subscribe((res: any) => {
      // this.bannedList = res;
      console.log(res);
      if (res[0].data) this.limitedList = res[0].data;
    });

    this.getList('semilimited').subscribe((res: any) => {
      // this.bannedList = res;
      console.log(res);
      if (res[0].data) this.semiLimitedList = res[0].data;
    });

    this.getList('unlimited').subscribe((res: any) => {
      // this.bannedList = res;
      console.log(res);
      if (res[0].data) this.unlimitedList = res[0].data;
    });
  }

  getList(listName: string) {
    const res = this.cardService.getList(listName);
    return res;
  }
}
