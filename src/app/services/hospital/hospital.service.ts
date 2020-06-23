import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Hospital } from '../../models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {


  constructor(public http: HttpClient, public _us: UsuarioService) { }

  cargarHospitales(desde: number){
    let url = URL_SERVICIOS+'/hospital?desde='+desde;
    return this.http.get(url);
  }

  cargarTodosLosHospitales(){
    let url = URL_SERVICIOS+'/hospitales';
    return this.http.get(url);
  }

  obtenerHospital(id : string){
    let url = URL_SERVICIOS+'/hospital/'+id;
    return this.http.get(url);
  }

  crearHospital(hospital: Hospital){
    let url = URL_SERVICIOS+'/hospital?token='+this._us.token;
    return this.http.post(url, hospital);
  }

  actualizarHospital(hospital: Hospital){
    let url = URL_SERVICIOS+'/hospital/'+hospital._id+'?token='+this._us.token;
    return this.http.put(url, hospital);
  }

  borrarHospital(id : string){
    let url = URL_SERVICIOS+'/hospital/'+id+'?token='+this._us.token;
    return this.http.delete(url);
  }

  buscarHospital(termino: string){
    let url = URL_SERVICIOS+'/busqueda/coleccion/hospital/'+termino;
    return this.http.get(url);
  }
}
