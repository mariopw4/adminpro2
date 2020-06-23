import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Medico } from '../../models/medico.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _ms: MedicoService, 
    public router: Router, 
    public _hs: HospitalService, 
    public activatedRoute: ActivatedRoute,
    public _mus: ModalUploadService
    ) { 
      this.activatedRoute.params.subscribe( params => {
        let id = params['id'];
        if(id !== 'nuevo'){
          this.cargarMedico(id);
        }
      });
    }

  ngOnInit(): void {
    this._hs.cargarTodosLosHospitales().subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
    });
    this._mus.notificacion.subscribe(resp => {
      this.medico.img = resp.medico.img;
    })
  }

  guardarMedico(f: NgForm){
    if(f.invalid) return;
    this._ms.guardarMedico(this.medico).subscribe(medico => {
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);
    });
  }

  cambioHospital(event){
    this._hs.obtenerHospital(event).subscribe((resp:any) => {
      this.hospital = resp.hospital;
    });
  }

  cargarMedico(id: string){
    this._ms.obtenerMedico(id).subscribe((resp: any) => {
      this.medico = resp.medico;
      this.medico.hospital = resp.medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }

  cambiarFoto(){
    this._mus.mostrarModal('medicos', this.medico._id);
  }

}
