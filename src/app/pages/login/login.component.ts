import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(public auth: AngularFireAuth) {}

  ngOnInit(): void {}

  login() {
    this.auth
      .signInWithEmailAndPassword('admin@nash.com', '123456')
      .then(console.log);
  }

  logout() {
    this.auth.signOut();
  }
}
