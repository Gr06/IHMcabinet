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

  ngOnInit() {

  }

  /**
   * Afficher le formulaire d'ajout de patient
   */
  ajouterNouveauPatient() {
      this.dialog.open(AjoutPatientComponent, {
        width: '450px'
      });

  }

  /**
   * Retourner la liste des patients non affectés
   * @returns {PatientInterface[]}
   */
  getPatientNonAffectes() {
    return this.cms.patientsNonAffectés;
  }

  /**
   * Désaffecter un patient, le patient devient un patient non affecté
   * @param event
   */
  desaffecterPatient(event) {
    if (event.patient) {
      this.cabinetMedicalService.desaffPatient(event.patient).subscribe((value => {
        this.dialog.open(MessageComponent, {
          width: '250px',
          data: {message: 'Le patient a été désaffecté'}
        });

      }));
    }
    console.log(event);
  }
}
