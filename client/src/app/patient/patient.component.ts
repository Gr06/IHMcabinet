import {Component, Input, OnInit} from '@angular/core';
import {PatientInterface} from "../dataInterfaces/patient";
import {CabinetMedicalService} from "../cabinet-medical.service";
import {CabinetInterface} from "../dataInterfaces/cabinet";
import {MatDialog} from "@angular/material";
import {MessageComponent} from "../message/message.component";

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

  getFullNameInfirmier(infirmier) {
    return infirmier.nom+' '+infirmier.prénom;
  }

  reaffecterPatient(infirmier) {
    this.cabinetService.affPatient(this.selected, this.patient).subscribe((value => {
      this.dialog.open(MessageComponent, {
        width: '250px',
        data: {message: 'Le patient à été réaffecté'}
      });
    }));
  }

}
