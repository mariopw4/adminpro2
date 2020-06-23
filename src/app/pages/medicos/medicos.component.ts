import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  totalMedicos: number;
  medicos: Medico[] = [];

  constructor(public _ms: MedicoService) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }
  buscarMedicos(termino: string){
    if(termino.length === 0){
      this.cargarMedicos();
      return;
    }
    this._ms.buscarMedicos(termino).subscribe( (resp: any) => {
      this.medicos = resp.medicos;
    });
  }

  crearMedico(){}

  actualizarMedico(){}

  borrarMedico(medico: Medico){
    Swal.fire({
      title: '¿Está seguro?',
      text: "Está seguro que desea eliminar a "+medico.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.value) {
        this._ms.borrarMedico(medico._id).subscribe();
        Swal.fire(
          'Eliminado!',
          'El medico seleccionado ha sido eliminado',
          'success'
        );
        this.cargarMedicos();
      }
    });
  }

  cargarMedicos(){
    this._ms.cargarMedicos().subscribe((resp: any) => {
      this.totalMedicos = resp.total;
      this.medicos = resp.medicos;
    });
  }
}
