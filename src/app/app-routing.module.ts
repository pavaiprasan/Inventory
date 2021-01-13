import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './Auth/auth.guard';
import { LayoutComponent } from './Common/layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
      component: LayoutComponent,
      data: {
        title: 'Dashboard'
      },
      children: [
        {  path: 'dashboard',
           component:DashboardComponent, 
           canActivate: [AuthGuard],
           data: {title: 'Home'}},
      ]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'login'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
