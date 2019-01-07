import {Component, Input, OnInit} from '@angular/core';
import {PatientInterface} from "../dataInterfaces/patient";
import {CabinetMedicalService} from "../cabinet-medical.service";
import {CabinetInterface} from "../dataInterfaces/cabinet";
import {MatDialog} from "@angular/material";
import {MessageComponent} from "../message/message.component";
import {InfirmierInterface} from "../dataInterfaces/infirmier";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  userForm: FormGroup;
  selected;
  @Input() patient: PatientInterface;
  private cabinet: CabinetInterface;

  constructor(private formBuilder: FormBuilder, private cabinetService: CabinetMedicalService,
              public dialog: MatDialog) {
    this.cabinet = this.cabinetService.cabinet;
  }

  ngOnInit() {
    this.initForm();
  }

  /**
   * Initialisation des validations du formulaire
   */
  initForm() {
    this.userForm = this.formBuilder.group({
      infirmier: ['',Validators.required]
    });
  }

  /**
   * Retourner le nom et prénom du patient
   * @returns {string}
   */
  getFullName() {
    return this.patient.nom + ' ' + this.patient.prénom;
  }

  /**
   * Retourner le numéro de sécurité sociale du patient
   * @returns {string}
   */
  getNumSecu() {
    return this.patient.numéroSécuritéSociale;
  }

  /**
   * Retourner numéro, rue, code postal et ville du patient
   * @returns {string}
   */
  getFullAddress() {
    return this.patient.adresse.numéro+" "+this.patient.adresse.rue+" - "+
      this.patient.adresse.codePostal+ " " +this.patient.adresse.ville;
  }

  /**
   * Retourner le prénom et nom de l'infirmier
   * @param infirmier
   * @returns {string}
   */
  getFullNameInfirmier(infirmier : InfirmierInterface) {
    return infirmier.prénom+' '+infirmier.nom;
  }


  /**
   * Affecter (ou réaffecter) le patient à un infirmier
   */
  affecterPatient() {
    this.cabinetService.affPatient(this.selected, this.patient).subscribe((value => {
      this.dialog.open(MessageComponent, {
        width: '250px',
        data: {message: 'Le patient a été affecté'}
      });

    }));
  }

  /**
   * Désaffecter le patient, le patient devient un patient non affecté
   */
  desaffecterPatient() {
    this.cabinetService.desaffPatient(this.patient).subscribe((value => {
      this.dialog.open(MessageComponent, {
        width: '250px',
        data: {message: 'Le patient a été désaffecté'}
      });
    }));
  }

  /**
   * Retourner la liste des patients non affectés
   * @returns {PatientInterface[]}
   */
  getPatientNonAffectes() {
    return this.cabinet.patientsNonAffectés;
  }

}
