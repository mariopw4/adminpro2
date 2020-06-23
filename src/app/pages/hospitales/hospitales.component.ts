import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  desde: number = 0;
  hospitales: Hospital[] = [];
  totalRegistros: number = 0;
  cargando: boolean;

  constructor(public _hs: HospitalService, public _mus: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this._mus.notificacion.subscribe(resp => this.cargarHospitales());
  }

  cambiarDesde(valor: number){
    let desde = this.desde + valor;
    if(desde < 0){
      return;
    }
    if(desde >= this.totalRegistros){
      return;
    }
    this.desde = desde;
    this.cargarHospitales();
  }


  cargarHospitales(){
    this.cargando = true;
    this._hs.cargarHospitales(this.desde).subscribe((resp: any) => {
        this.hospitales = resp.hospitales;
        this.totalRegistros = resp.total;
        this.cargando = false;
    });
  }

  buscarHospital(termino: string){
    if(termino.length === 0) {
      this.cargarHospitales();
      return;
    }
    this._hs.buscarHospital(termino).subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
    });
  }

  borrarHospital(hospital: Hospital){
    Swal.fire({
      title: '¿Está seguro?',
      text: "Está seguro que desea eliminar "+hospital.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.value) {
        this._hs.borrarHospital(hospital._id).subscribe();
        Swal.fire(
          'Eliminado!',
          'El hospital ha sido eliminado',
          'success'
        );
        this.cargarHospitales();
      }
    });
  }

  crearHospital(){
    Swal.fire({
      title: 'Crear hospital',
      text: "Ingrese el nombre del hospital",
      input: 'text',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar'
    }).then((result) => {
      if (result.value) {
        let hospital = new Hospital(result.value.toString());
        this._hs.crearHospital(hospital).subscribe(resp => {
          this.cargarHospitales();
        });
        Swal.fire(
          'Creado!',
          'Hospital creado correctamente',
          'success'
        );
      }
    });
  }

  actualizarHospital(hospital: Hospital, nombre: string){
    if(nombre.length === 0){
      Swal.fire('Campos vacios','Ingrese un nombre válido para el hospital', 'error');
      return;
    }

    hospital.nombre = nombre;
    this._hs.actualizarHospital(hospital).subscribe(resp => {
      Swal.fire('Hospital actualizado', 'Registro actualizado correctamente', 'success');
      console.log(resp);
      this.cargarHospitales();
    });
    
  }

  mostrarModal(id: string){
    this._mus.mostrarModal('hospitales', id);
  }

}