import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatExpansionModule } from '@angular/material/expansion';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { CardsService } from './services/cards.service';
import { AngularFireModule } from '@angular/fire/compat';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    DragDropModule,
    MatExpansionModule,
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyBH87PQD9-7QoEmihN8KGVBWGTK8W5y8Gs',
        authDomain: 'banlistcreator.firebaseapp.com',
        projectId: 'banlistcreator',
        storageBucket: 'banlistcreator.appspot.com',
        messagingSenderId: '533357606345',
        appId: '1:533357606345:web:fa4892770aadbc5f682418',
        measurementId: 'G-QKHXXTB1CN',
      })
    ),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyBH87PQD9-7QoEmihN8KGVBWGTK8W5y8Gs',
      authDomain: 'banlistcreator.firebaseapp.com',
      projectId: 'banlistcreator',
      storageBucket: 'banlistcreator.appspot.com',
      messagingSenderId: '533357606345',
      appId: '1:533357606345:web:fa4892770aadbc5f682418',
      measurementId: 'G-QKHXXTB1CN',
    }),
  ],
  providers: [CardsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
