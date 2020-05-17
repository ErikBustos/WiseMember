import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { HeaderComponent } from './header/header.component';
import { SignUpComponent } from './Register/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { LayoutComponent } from './dashboard/layout/layout.component';
import { NotesComponent } from './dashboard/notes/notes.component';
import { UploadClippingComponent } from './upload-clipping/upload-clipping.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadFileComponent,
    HeaderComponent,
    SignUpComponent,
    HomeComponent,
    SidebarComponent,
    LayoutComponent,
    NotesComponent,
    UploadClippingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
