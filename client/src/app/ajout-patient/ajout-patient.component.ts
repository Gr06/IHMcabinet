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

  ajouterPatient(nom,prenom,sexe,numeroSecu, ville, codePostal, rue, numero, etage) {
    const patient: PatientInterface= {prénom: prenom, nom:nom, sexe:sexe, numéroSécuritéSociale:numeroSecu, adresse: {
        ville: ville,
        codePostal: codePostal,
        rue: rue,
        numéro: numero,
        étage: etage
      }};
    this.cabinetMedicalService.addPatient(patient).subscribe((value => {
      this.dialog.open(MessageComponent, {
        width: '250px',
        data: {message: 'Le patient a été ajouté'}
      });
      this.dialogRef.close();
    }));
  }

}
