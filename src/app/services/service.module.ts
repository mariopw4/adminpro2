import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SidebarService, SharedService,UsuarioService,SubirArchivoService, LoginGuardGuard, AdminGuard, MedicoService, HospitalService} from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    AdminGuard,
    SubirArchivoService,
    ModalUploadComponent,
    HospitalService,
    MedicoService
  ]
})
export class ServiceModule { }
