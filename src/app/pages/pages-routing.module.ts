import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { VerificaTokenGuard, AdminGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


const routes: Routes = [
          {
              path: 'dashboard', 
              component: DashboardComponent, 
              data: {titulo: 'Dashboard'},
              canActivate: [VerificaTokenGuard]
            },
          {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
          {path: 'graficas1', component: Graficas1Component, data: {titulo: 'Gráficas'}},
          {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
          {path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'}},
          {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes del Tema'}},
          {path: 'profile', component: ProfileComponent, data: {titulo: 'Perfil de usuario'}},
          {path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador'}},
          //Mantenimientos
          {path:'usuarios', component: UsuariosComponent, data: {titulo: 'Mantenimiento de usuarios'}, canActivate: [AdminGuard]},
          {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de hospitales'}},
          {path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de medicos'}},
          {path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizar médico'}},
          {path: '', pathMatch: 'full', redirectTo: '/dashboard'}

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRouter {}
