import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { SignUpComponent } from './Register/sign-up/sign-up.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { LayoutComponent } from './dashboard/layout/layout.component';
import { AuthGuardService } from './services/auth/auth-guard.service'
import { UploadClippingComponent } from './upload-clipping/upload-clipping.component';

const routes: Routes = [
  {path: 'home' , component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'uploadClippings', component: UploadClippingComponent},
  {path: 'upload', component: UploadClippingComponent},
  {path: 'google/redirect', component: LayoutComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'dashboard', component: LayoutComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
