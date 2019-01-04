import { CabinetMedicalService } from './../cabinet-medical.service';
import { Component, OnInit } from '@angular/core';
import { CabinetInterface } from '../dataInterfaces/cabinet';
import {PatientInterface} from "../dataInterfaces/patient";

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.scss']
})
export class SecretaryComponent implements OnInit {

  public patient: PatientInterface;

  private _cms: CabinetInterface;
  public get cms(): CabinetInterface { return this._cms; }

  constructor(private cabinetMedicalService: CabinetMedicalService ) {

    this.initCabinet(cabinetMedicalService);
  }

  async initCabinet(cabinetMedicalService) {
    this._cms = await cabinetMedicalService.getData('/data/cabinetInfirmier.xml');
    console.log( this.cms );


  }

  async addPatient(name: string) {
    name = name.trim();
    this.patient = {prénom: name, nom:"ee",sexe:1,numéroSécuritéSociale:"0",adresse:"lol"};
    if (!name) { return; }
    let lol = await this.cabinetMedicalService.addPatient(this.patient);
    this._cms.patientsNonAffectés.push(lol);
  }

  ngOnInit() {

  }

}
