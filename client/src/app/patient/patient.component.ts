import {Component, Input, OnInit} from '@angular/core';
import {PatientInterface} from "../dataInterfaces/patient";
import {CabinetMedicalService} from "../cabinet-medical.service";
import {CabinetInterface} from "../dataInterfaces/cabinet";
import {MatDialog} from "@angular/material";
import {MessageComponent} from "../message/message.component";
import {InfirmierInterface} from "../dataInterfaces/infirmier";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {


  selected;
  @Input() patient: PatientInterface;
  private cabinet: CabinetInterface;

  constructor(private cabinetService: CabinetMedicalService,
              public dialog: MatDialog) {
    this.cabinet = this.cabinetService.cabinet;
  }

  ngOnInit() {
  }

  getFullName() {
    return this.patient.nom + ' ' + this.patient.prénom;
  }

  getNumSecu() {
    return this.patient.numéroSécuritéSociale;
  }

  getFullAddress() {
    return this.patient.adresse.numéro+" "+this.patient.adresse.rue+" - "+
      this.patient.adresse.codePostal+ " " +this.patient.adresse.ville;
  }

  getFullNameInfirmier(infirmier : InfirmierInterface) {
    return infirmier.prénom+' '+infirmier.nom;
  }

  affecterPatient() {
    this.cabinetService.affPatient(this.selected, this.patient).subscribe((value => {
      this.dialog.open(MessageComponent, {
        width: '250px',
        data: {message: 'Le patient a été affecté'}
      });

    }));
  }

  desaffecterPatient() {
    this.cabinetService.desaffPatient(this.patient).subscribe((value => {
      this.dialog.open(MessageComponent, {
        width: '250px',
        data: {message: 'Le patient a été désaffecté'}
      });

    }));

  }

  getPatientNonAffectes() {
    return this.cabinet.patientsNonAffectés;
  }

  affecterPatientById(event) {
    console.log(event);
  }

}
