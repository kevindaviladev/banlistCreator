import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = new FormControl('');
  password = new FormControl('');
  isPasswordShowed = false;
  // 'admin@nash.com', '123456'
  constructor(public auth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.auth
      .signInWithEmailAndPassword(this.email.value, this.password.value)
      .then((res) => {
        this.router.navigateByUrl('/admin');
      })
      .catch((err) =>
        swal.fire('Error', 'Usuario o clave incorrectos', 'error')
      );
  }

  logout() {
    this.auth.signOut();
  }
}
