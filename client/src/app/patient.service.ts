import { Injectable } from '@angular/core';
import { Adresse } from './dataInterfaces/adresse';
import { InfirmierInterface } from './dataInterfaces/infirmier';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { CabinetInterface } from './dataInterfaces/cabinet';
import { PatientInterface } from './dataInterfaces/patient';
import { sexeEnum } from './dataInterfaces/sexe';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private _cabinet: CabinetInterface;

  private _http: HttpClient;
  public get http(): HttpClient { return this._http; }

  constructor( http: HttpClient ) {
    this._http = http;
  }

  public async addPatient(patient: PatientInterface): Promise<PatientInterface> {
    const res = await this._http.post('/addPatient', {
      patientName: patient.nom,
      patientForname: patient.prénom,
      patientNumber: patient.numéroSécuritéSociale,
      patientSex: patient.sexe === sexeEnum.M ? 'M' : 'F',
      patientBirthday: 'AAAA-MM-JJ',
      patientFloor: patient.adresse.étage,
      patientStreetNumber: patient.adresse.numéro,
      patientStreet: patient.adresse.rue,
      patientPostalCode: patient.adresse.codePostal,
      patientCity: patient.adresse.ville
    }, {observe: 'response'}).toPromise<HttpResponse<any>>();

    console.log('Add patient renvoie', res);
    if (res.status === 200) {
      // OK on peut ajouter en local
      this.cabinet.patientsNonAffectés.push( patient );
    }
    return null;
  }

}
