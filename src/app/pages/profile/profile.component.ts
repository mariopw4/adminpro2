import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  constructor(public _us: UsuarioService) { }

  ngOnInit(): void {
    this.usuario = this._us.usuario;
  }

  guardar(usuario: Usuario){
    if(!this.usuario.google){
      this.usuario.email = usuario.email;
    }
    this.usuario.nombre = usuario.nombre;

    this._us.actualizarUsuario(this.usuario).subscribe();
  }

  seleccionImagen(archivo: File){
    if(!archivo) {
      this.imagenSubir = null;
      return;
    }

    if(archivo.type.indexOf('image') < 0){
      Swal.fire('Solo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    }
  }

  cambiarImagen(){
    this._us.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
