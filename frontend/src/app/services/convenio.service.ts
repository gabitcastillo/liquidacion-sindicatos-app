import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nomina } from '../interfaces/Nomina';

@Injectable({
  providedIn: 'root'
})
export class ConvenioService {

  API_URI_AXTON = 'http://localhost:3000/liquidacion';
  convenio : Nomina[];

  constructor(private http: HttpClient) {
    this.convenio = []; 
   }

  listarNominaGeneral(){
    return this.http.get(`${this.API_URI_AXTON}/list/`);
  }
  
  listarConvenio(){
    return this.http.get(`${this.API_URI_AXTON}/listConvenio/`);
  }
}
