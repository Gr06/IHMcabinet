import {Component, Input, OnInit} from '@angular/core';
import { InfirmierInterface } from '../dataInterfaces/infirmier';

@Component({
  selector: 'app-infirmier',
  templateUrl: './infirmier.component.html',
  styleUrls: ['./infirmier.component.scss']
})

export class InfirmierComponent implements OnInit {

  @Input() infirmier: InfirmierInterface;

  constructor() {
  }

  ngOnInit() {
  }

  getInfirmierFullName() {
    return this.infirmier.prénom+" "+this.infirmier.nom;
  }

  getFullAddress() {
    return this.infirmier.adresse.codePostal+ " - " +this.infirmier.adresse.ville;
  }
}
