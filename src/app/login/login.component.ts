import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import Swal from 'sweetalert2';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;

  auth2: any;

  constructor(public router: Router,
              public _us: UsuarioService) { }

  ngOnInit(): void {
    init_plugins();
    this.googleInit();
    if(localStorage.getItem('email')){
      this.email = localStorage.getItem('email');
      this.recuerdame = true;
    }
  }

  googleInit(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id : '762137144933-hmkgqhbarcmbbd2sspdlfn1oefhb50pl.apps.googleusercontent.com',
        coockiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element){
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      let profile = googleUser.getBasicProfile();
      /* console.log(profile); */
      let token = googleUser.getAuthResponse().id_token;
      this._us.loginGoogle(token).subscribe(resp => window.location.href = '#/dashboard');
      /* console.log(token); */
    });
  }

  ingresar(forma: NgForm){
    if(forma.invalid) return;

    let usuario = new Usuario(null, forma.value.email, forma.value.password);
    this._us.login(usuario, forma.value.recuerdame).subscribe(
      resp => this.router.navigate(['/dashboard']),
      err => Swal.fire('Error login', err.error.mensaje, 'error')
      );
  }

}
