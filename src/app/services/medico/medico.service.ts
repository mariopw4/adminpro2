import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(public http: HttpClient, public _us: UsuarioService) { }

  cargarMedicos(){
    let url = URL_SERVICIOS+'/medico';
    return this.http.get(url);
  }

  buscarMedicos(termino: string){
    let url = URL_SERVICIOS+'/busqueda/coleccion/medico/'+termino;
    return this.http.get(url);
  }

  borrarMedico(id: string){
    let url = URL_SERVICIOS+'/medico/'+id+'?token='+this._us.token;
    return this.http.delete(url);
  }

  guardarMedico(medico: Medico){
    let url = URL_SERVICIOS+'/medico';
    if(medico._id){
      url += '/'+medico._id +'?token='+this._us.token;
      return this.http.put(url, medico).pipe(map( (resp:any) => {
        Swal.fire('Médico Actualizado', medico.nombre, 'success');
        return resp.medico;
      }))
    }else{
      url += '?token='+this._us.token;
      return this.http.post(url, medico).pipe(map( (resp: any) => {
        Swal.fire('Médico Creado', medico.nombre, 'success');
        return resp.medico;
      }));
    }
  }

  obtenerMedico(id: string){
    let url = URL_SERVICIOS+'/medico/'+id;
    return this.http.get(url);
  }
}
