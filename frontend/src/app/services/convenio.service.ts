import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Nomina } from '../interfaces/Nomina';

@Injectable({
  providedIn: 'root'
})
export class ConvenioService {

  API_URI_AXTON = 'http://localhost:3000';
  convenio: Nomina[];

  constructor(private http: HttpClient) {
    this.convenio = [];
  }

  findConvenio(data: any) {
    return this.http.get(`${this.API_URI_AXTON}/list`, data);
  }
  getExcel() {
    return this.http.get(`http://localhost:3000/read/readExcel/`);
  }
  setJSON(data : any){
    return this.http.post(`http://localhost:3000/add`, data);
  }
  // GetExcelPrueba() {
  //   try {
  //     this.http.get('assets/1234.xlsx', { responseType: 'blob' }).subscribe((blob: Blob) => {
  //       const fileReader = new FileReader();
  //       fileReader.onload = (e: any) => {
  //         const bstr: string = e.target.result;
  //         const workbook: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

  //         // Obtener el primer nombre de la hoja de Excel
  //         const firstSheetName: string = workbook.SheetNames[0];
  //         const worksheet: XLSX.WorkSheet = workbook.Sheets[firstSheetName];

  //         // Convertir la hoja de Excel a JSON
  //         const data: any = XLSX.utils.sheet_to_json(worksheet, { raw: true });
  //         console.log('Datos del archivo Excel:', data);
  //       };

  //       fileReader.readAsBinaryString(blob);
  //     });
  //   } catch (error) {
  //     console.error('Error al intentar leer el archivo Excel:', error);
  //   }
  // }
}
  /*

  listarNominaGeneral(){
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URI_AXTON).subscribe((result:any) => {
        resolve(result);
      });
    });
  }
  */

