import { Component, OnInit } from '@angular/core';
import {CabinetMedicalService} from "../cabinet-medical.service";
import {PatientInterface} from "../dataInterfaces/patient";
import {MessageComponent} from "../message/message.component";
import {MatDialog, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-ajout-patient',
  templateUrl: './ajout-patient.component.html',
  styleUrls: ['./ajout-patient.component.scss']
})
export class AjoutPatientComponent implements OnInit {

  constructor(private cabinetMedicalService: CabinetMedicalService, public dialog: MatDialog, public dialogRef: MatDialogRef<AjoutPatientComponent>) { }

  ngOnInit() {
  }


  ajouterPatient(name) {
    const patient: PatientInterface= {prénom: name, nom:name, sexe:1, numéroSécuritéSociale:"0", adresse: {
        ville: '',
        codePostal: 455,
        rue: '',
        numéro: '',
        étage: ''
      }};
    this.cabinetMedicalService.addPatient(patient).subscribe((value => {
      this.dialog.open(MessageComponent, {
        width: '250px',
        data: {message: 'Le patient à été ajouté'}
      });
      this.dialogRef.close();
    }));
  }

}
