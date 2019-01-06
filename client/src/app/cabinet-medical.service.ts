import { Adresse } from './dataInterfaces/adresse';
import { InfirmierInterface } from './dataInterfaces/infirmier';
import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { CabinetInterface } from './dataInterfaces/cabinet';
import { PatientInterface } from './dataInterfaces/patient';
import { sexeEnum } from './dataInterfaces/sexe';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CabinetMedicalService {

  get cabinet(): CabinetInterface {
    return this._cabinet;
  }

  set cabinet(value: CabinetInterface) {
    this._cabinet = value;
  }

  private _cabinet: CabinetInterface;

  private _http: HttpClient;

  public get http(): HttpClient { return this._http; }

  constructor( http: HttpClient ) {
    this._http = http;
  }

  async getData( url: string ): Promise<CabinetInterface>
  {
    //get HTTP response as text
    const response = await this.http.get(url, { responseType: 'text' }).toPromise();

    //parse the response with DOMParser
    let parser = new DOMParser();
    let doc = parser.parseFromString(response, "application/xml");

    //if no doc, exit
    if(!doc) return null;

    //default cabinet
    const cabinet: CabinetInterface = {
      infirmiers: [],
      patientsNonAffectés: [],
      adresse: this.getAdressFrom( doc.querySelector( "cabinet" ) )
    };

    // 1 - tableau des infirmiers
    const infirmiersXML =  Array.from( doc.querySelectorAll( "infirmiers > infirmier" ) ); //transformer la NodeList en tableau pour le map

    cabinet.infirmiers = infirmiersXML.map( I => ({
      id      : I.getAttribute("id"),
      prénom  : I.querySelector("prénom").textContent,
      nom     : I.querySelector("nom"   ).textContent,
      photo   : I.querySelector("photo" ).textContent,
      adresse : this.getAdressFrom(I),
      patients: []
    }) );

    // 2 tableau des patients
    const patientsXML  = Array.from( doc.querySelectorAll( "patients > patient" ) );
    const patients: PatientInterface[] = patientsXML.map( P => ({
      prénom: P.querySelector("prénom").textContent,
      nom: P.querySelector("nom").textContent,
      sexe: P.querySelector("sexe").textContent === "M" ? sexeEnum.M : sexeEnum.F,
      numéroSécuritéSociale: P.querySelector("numéro").textContent,
      adresse: this.getAdressFrom( P )
    }) );

    // 3 Tableau des affectations à faire.
    const affectations = patientsXML.map( (P, i) => {
      const visiteXML = P.querySelector( 'visite[intervenant]:not([intervenant=""])' );
      let infirmier: InfirmierInterface = null;
      if (visiteXML !== null) {
        infirmier = cabinet.infirmiers.find( I => I.id === visiteXML.getAttribute("intervenant") );
      }
      return {patient: patients[i], infirmier: infirmier};
    } );

    // 4 Réaliser les affectations
    affectations.forEach( ({patient: P, infirmier: I}) => {
      if (I !== null) {
        I.patients.push( P );
      } else {
        cabinet.patientsNonAffectés.push( P );
      }
    });

    // Return the cabinet
    return cabinet;

  }

  private getAdressFrom(root: Element): Adresse {
    let node: Element;
    return {
      ville       : (node = root.querySelector("adresse > ville")     ) ? node.textContent                    : "",
      codePostal  : (node = root.querySelector("adresse > codePostal")) ? parseInt(node.textContent, 10) : 0,
      rue         : (node = root.querySelector("adresse > rue")       ) ? node.textContent                    : "",
      numéro      : (node = root.querySelector("adresse > numéro")    ) ? node.textContent                    : "",
      étage       : (node = root.querySelector("adresse > étage")     ) ? node.textContent                    : "",
    };
  }


  addPatient(patient: PatientInterface){
    const res = this._http.post('/addPatient', {
      patientName: patient.nom,
      patientForname: patient.prénom,
      patientSex: patient.sexe === sexeEnum.M ? 'M' : 'F',
      patientBirthday: 'AAAA-MM-JJ',
      patientNumber: patient.numéroSécuritéSociale,
      patientFloor: patient.adresse.étage,
      patientStreetNumber: patient.adresse.numéro,
      patientStreet: patient.adresse.rue,
      patientPostalCode: patient.adresse.codePostal,
      patientCity: patient.adresse.ville
    }, {observe: 'response'});
    this.cabinet.patientsNonAffectés.push(patient);
    return res;
  }

  affPatient(infirmierId, patient: PatientInterface) {
    const res = this._http.post( "/affectation", {
      infirmier: infirmierId,
      patient: patient.numéroSécuritéSociale},
      {observe: 'response'});
    this.cabinet.patientsNonAffectés = this.cabinet.patientsNonAffectés.filter(p => p !== patient);
    this.cabinet.infirmiers.forEach(infirmier => infirmier.patients = infirmier.patients.filter(p => p !== patient));
    this.cabinet.infirmiers.forEach(infirmier => {if (infirmier.id === infirmierId)
      infirmier.patients.push(patient);
    });
    return res;
  }

  public desaffPatient(patient: PatientInterface) {
    const res = this._http.post( "/affectation", {
      infirmier: "none",
      patient: patient.numéroSécuritéSociale},
      {observe: 'response'});
    this.cabinet.infirmiers.forEach(infirmier => infirmier.patients = infirmier.patients.filter(p => p !== patient));
    this.cabinet.patientsNonAffectés.push(patient)
    return res;
  }

}
