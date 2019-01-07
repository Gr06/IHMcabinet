import {Component, Input, OnInit} from '@angular/core';
import { InfirmierInterface } from '../dataInterfaces/infirmier';
import {CabinetMedicalService} from "../cabinet-medical.service";
import {CabinetInterface} from "../dataInterfaces/cabinet";
import {MessageComponent} from "../message/message.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-infirmier',
  templateUrl: './infirmier.component.html',
  styleUrls: ['./infirmier.component.scss']
})

export class InfirmierComponent implements OnInit {

  @Input() infirmier: InfirmierInterface;
  private cabinet: CabinetInterface;

  constructor(private cabinetService: CabinetMedicalService,public dialog: MatDialog) {
    this.cabinet = this.cabinetService.cabinet;
  }

  ngOnInit() {
  }

  /**
   * Retourner le nom et prénom de l'infirmier
   * @returns {string}
   */
  getInfirmierFullName() {
    return this.infirmier.prénom+" "+this.infirmier.nom;
  }

  /**
   * Retourner numéro, rue, code postal et ville de l'infirmier
   * @return {string}
   */
  getFullAddress() {
    return this.infirmier.adresse.numéro+" "+this.infirmier.adresse.rue+"\n"+
      this.infirmier.adresse.codePostal+ " - " +this.infirmier.adresse.ville;
  }


  /**
   * Affecter le patient donné en paramètre suite à un drag & drop
   * @param event
   */
  affecterPatient(event) {
    if (event.patient) {
      this.cabinetService.affPatient(this.infirmier.id, event.patient).subscribe((value => {
        this.dialog.open(MessageComponent, {
          width: '250px',
          data: {message: 'Le patient a été affecté'}
        });
      }));
    }
    console.log(event);
  }

}
