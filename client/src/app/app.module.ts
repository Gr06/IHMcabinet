import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { InfirmierComponent } from './infirmier/infirmier.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecretaryComponent } from './secretary/secretary.component';
import { PatientComponent } from './patient/patient.component';
import { AjoutPatientComponent } from './ajout-patient/ajout-patient.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatExpansionModule,
  MatInputModule,
  MatSelectModule
} from "@angular/material";
import { MessageComponent } from './message/message.component';
import { NewclientComponent } from './newclient/newclient.component';

@NgModule({
  declarations: [
    AppComponent,
    SecretaryComponent,
    InfirmierComponent,
    PatientComponent,
    AjoutPatientComponent,
    MessageComponent,
    NewclientComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatExpansionModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    MessageComponent,
    AjoutPatientComponent
  ]
})
export class AppModule { }
