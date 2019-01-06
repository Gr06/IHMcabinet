import { CabinetMedicalService } from './../cabinet-medical.service';
import { Component, OnInit } from '@angular/core';
import { CabinetInterface } from '../dataInterfaces/cabinet';
import {PatientInterface} from "../dataInterfaces/patient";
import {MatDialog} from "@angular/material";
import {MessageComponent} from "../message/message.component";
import {AjoutPatientComponent} from "../ajout-patient/ajout-patient.component";

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.scss']
})
export class SecretaryComponent implements OnInit {

  patient: PatientInterface;
  patientsNonAff : PatientInterface[];

  private _cms: CabinetInterface;
  public get cms(): CabinetInterface { return this._cms; }

  constructor(private cabinetMedicalService: CabinetMedicalService, public dialog: MatDialog ) {

    this.initCabinet(cabinetMedicalService);
  }

  async initCabinet(cabinetMedicalService) {
    this._cms = await cabinetMedicalService.getData('/data/cabinetInfirmier.xml');
    this.cabinetMedicalService.cabinet = this._cms;
    this.patientsNonAff = this.cms.patientsNonAffectés;
  }

  async addPatient(name: string) {
    /*name = name.trim();
    if (!name) { return; }
    this.patient = {prénom: name, nom:name,sexe:1,numéroSécuritéSociale:"0",adresse: {}};
    let lol = await this.cabinetMedicalService.addPatient(this.patient);
    this._cms.patientsNonAffectés.push(this.patient);*/
  }

  async affPatient(infirmier, patient : PatientInterface) {
    let lol = await this.cabinetMedicalService.affPatient(infirmier.id,patient);
    this._cms.patientsNonAffectés.filter(p => p !== patient);
    this._cms.infirmiers.map(x => {if (x.id===infirmier.id) x.patients.push(patient);})
    //déplacer patient
  }

  ngOnInit() {

  }

  ajouterNouveauPatient() {
      this.dialog.open(AjoutPatientComponent, {
        width: '450px'
      });

  }

  getPatientNonAffectes() {
    return this.cms.patientsNonAffectés;
  }

  desaffecterPatient(event) {
    this.cabinetMedicalService.desaffPatient(event.patient).subscribe((value => {
      this.dialog.open(MessageComponent, {
        width: '250px',
        data: {message: 'Le patient a été désaffecté'}
      });

    }));
  }
}
