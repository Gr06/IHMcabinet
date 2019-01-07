import { Component, OnInit } from '@angular/core';
import {CabinetMedicalService} from "../cabinet-medical.service";
import {PatientInterface} from "../dataInterfaces/patient";
import {MessageComponent} from "../message/message.component";
import {MatDialog, MatDialogRef} from "@angular/material";
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: 'app-ajout-patient',
  templateUrl: './ajout-patient.component.html',
  styleUrls: ['./ajout-patient.component.scss']
})
export class AjoutPatientComponent implements OnInit {

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private cabinetMedicalService: CabinetMedicalService, public dialog: MatDialog, public dialogRef: MatDialogRef<AjoutPatientComponent>) {

  }

  ngOnInit() {
    this.initForm();
  }

  /**
   * Initialisation des validations du formulaire
   */
  initForm() {
    this.userForm = this.formBuilder.group({
      nom: ['',Validators.required],
      prenom: ['',Validators.required],
      sexe: ['',Validators.required],
      numeroSecu: ['',Validators.required],
      ville: ['',Validators.required],
      codePostal: ['',Validators.required],
      rue: ['',Validators.required],
      etage: ['',Validators.required],
      numero: ['',Validators.required]
    });
  }

  /**
   * Ajoute un patient à la soumission du formulaire
   */
  onSubmitForm() {
    const formValue = this.userForm.value;
    const patient: PatientInterface= {
      prénom: formValue.prenom,
      nom:formValue.nom,
      sexe:formValue.sexe,
      numéroSécuritéSociale:formValue.numeroSecu,
      adresse: {
        ville: formValue.ville,
        codePostal: formValue.codePostal,
        rue: formValue.rue,
        numéro: formValue.numero,
        étage: formValue.etage
      }};
    this.cabinetMedicalService.addPatient(patient).subscribe((value => {
      this.dialog.open(MessageComponent, {
        width: '250px',
        data: {message: 'Le patient a été ajouté'}
      });
      this.dialogRef.close();
    }));
    console.log(formValue);
  }

}
