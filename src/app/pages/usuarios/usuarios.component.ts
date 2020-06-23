import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean;

  constructor(public _us: UsuarioService, public _mus: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this._mus.notificacion.subscribe(resp => this.cargarUsuarios());
  }

  cargarUsuarios(){
    this.cargando = true;
    this._us.cargarUsuarios(this.desde).subscribe((resp:any) => {
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuario;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number){
    let desde = this.desde + valor;
    if(desde >= this.totalRegistros){
      return;
    }
    if(desde < 0){
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string){
    if(termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._us.buscarUsuarios(termino).subscribe((resp: any) => {
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  borrarUsuario(usuario: Usuario){
    if(usuario._id === this._us.usuario._id){
      Swal.fire('No puede borrar usuario','No se puede eliminar a si mismo','error');
      return;
    }

    Swal.fire({
      title: '¿Está seguro?',
      text: "Está a punto de borrar a "+usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.value) {
        this._us.borrarUsuario(usuario._id).subscribe( resp => this.cargarUsuarios());
        Swal.fire(
          'Eliminado!',
          'Usuario eliminado correctamente',
          'success'
        )
      }
    })
  }

  guardarUsuario(usuario: Usuario){
    this._us.actualizarUsuario(usuario).subscribe();
  }

  mostrarModal(id: string){
    this._mus.mostrarModal('usuarios', id);
  }
}
