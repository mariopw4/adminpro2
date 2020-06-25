import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(public http: HttpClient, public router: Router, public _sa: SubirArchivoService) { 
    this.cargarStorage();
  }

  renuevaToken(){
    let url = URL_SERVICIOS+'/login/renuevatoken?token='+this.token;
    return this.http.get(url).pipe(map( (resp: any) => {
      this.token = resp.token;
      localStorage.setItem('token', resp.token);
      return true;
    }));
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any){
    localStorage.setItem('id', id);
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      localStorage.setItem('menu', JSON.stringify(menu));
      this.usuario = usuario;
      this.token = token;
      this.menu = menu;
  }

  logout(){
    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  login(usuario: Usuario, recuerdame: boolean = false){
    if(recuerdame){
      localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email');
    }
    return this.http.post(URL_SERVICIOS+'/login', usuario)
    .pipe(map( (resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
      return true;
    }));
  }

  loginGoogle(token: string){
    return this.http.post(URL_SERVICIOS+'/login/google', {token})
    .pipe(map( (resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
      return true;
    }));
  }

  estaLogueado(){
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    }else{
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  crearUsuario(usuario: Usuario){
    return this.http.post(URL_SERVICIOS+'/usuario', usuario)
        .pipe(map( (resp: any) => {
            Swal.fire('Usuario creado', usuario.email, 'success');
            return resp.usuario;
        }));
  }

  actualizarUsuario(usuario: Usuario){
    return this.http.put(URL_SERVICIOS+'/usuario/'+usuario._id+'?token='+this.token, usuario)
    .pipe(map((resp: any) => {
      if(usuario._id === this.usuario._id){
        this.guardarStorage(resp.usuario._id, this.token, resp.usuario, this.menu);
      }
      Swal.fire('Usuario actualizado', usuario.nombre, 'success');
      return true;
    }));
  }

  cambiarImagen(archivo: File, id: string){
    this._sa.subirArchivo(archivo, 'usuarios', id)
    .then((resp: any) => {
      this.usuario.img = resp.usuario.img;
      Swal.fire('Imagen actualizada', this.usuario.nombre, 'success');
      this.guardarStorage(id, this.token, this.usuario, this.menu);
    }).catch(resp => {
      console.log(resp);
    });
  }
  

  cargarUsuarios(desde: number = 0){
    let url = URL_SERVICIOS+'/usuario?desde='+desde;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string){
    let url = URL_SERVICIOS+'/busqueda/coleccion/usuario/'+termino;
    return this.http.get(url);
  }

  borrarUsuario(id: string){
    let url = URL_SERVICIOS+'/usuario/'+id+'?token='+this.token;
    return this.http.delete(url);
  }
}
