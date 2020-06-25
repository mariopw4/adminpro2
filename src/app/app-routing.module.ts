import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';
import { PagesRouter } from './pages/pages-routing.module';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/service.index';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '', 
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    loadChildren: './pages/pages.module#PageModule'
  },
  {path: 'register', component: RegisterComponent},
  {path: '**', component: NopagefoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

    /* {
      path: '', 
      component: PagesComponent,
      children:[
        {path: 'dashboard', component: DashboardComponent},
        {path: 'progress', component: ProgressComponent},
        {path: 'graficas1', component: Graficas1Component},
        {path: '', pathMatch: 'full', redirectTo: 'dashboard'}
      ]
    }, */