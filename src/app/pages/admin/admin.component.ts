import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { CdkDragDrop, copyArrayItem } from '@angular/cdk/drag-drop';
import { Card } from 'src/app/interfaces/card.interface';
import { CardsService } from 'src/app/services/cards.service';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
import swal from 'sweetalert2';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
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
    // // console.log(ga);
  }

  async searchCard(cardName: string) {
    const response = await this.cardService.getCard(cardName).toPromise();
    return response;
  }

  dropOnList(event: CdkDragDrop<Card[]>) {
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

  saveList() {
    console.log('banned', this.bannedList);
    console.log('limited', this.limitedList);
    console.log('semilimited', this.semiLimitedList);
    console.log('unlimited', this.unlimitedList);
    this.saveLists();
  }

  getList(listName: string) {
    const res = this.cardService.getList(listName);
    return res;
  }

  saveLists() {
    swal
      .fire({
        title: '¿Guardar los cambios?',
        text: `Se actualizará la banlist publicada`,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonText: 'Sí',
        confirmButtonColor: '#1D90CE',
        cancelButtonColor: '#A01B0A',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.cardService.setList('banned', this.bannedList);
          this.cardService.setList('limited', this.limitedList);
          this.cardService.setList('semilimited', this.semiLimitedList);
          this.cardService.setList('unlimited', this.unlimitedList);
          swal.fire('¡Banlist actualizada!', '', 'success');
        }
      });
    // this.cardService.setList('banned', this.bannedList);
    // this.cardService.setList('limited', this.limitedList);
    // this.cardService.setList('semilimited', this.semiLimitedList);
    // this.cardService.setList('unlimited', this.unlimitedList);
  }

  deleteCard(event: any, card: Card, list: Card[]) {
    console.log('ga');
    
    event.preventDefault();

    swal
      .fire({
        title: '¿Quitar la carta?',
        text: `${card.name}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, la odio.',
        cancelButtonText: 'No :(',
        confirmButtonColor: '#1D90CE',
        cancelButtonColor: '#A01B0A',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          const indexCard = list.indexOf(card);
          if (indexCard !== -1) {
            list.splice(indexCard, 1);
          }
          console.log(list);
          console.log(card);
          swal.fire('Removida!', 'Product removed successfully.', 'success');
        }
      });
  }
}
