import { Component, OnInit, ViewChild } from '@angular/core';
import { Nomina } from 'src/app/interfaces/Nomina';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConvenioService } from 'src/app/services/convenio.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { utils, writeFile } from 'xlsx';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-list-liquidacion',
  templateUrl: './list-liquidacion.component.html',
  styleUrls: ['./list-liquidacion.component.css'],
})
export class ListLiquidacionComponent implements OnInit {

  titulo: string = 'Liquidación de Sindicatos';
  select_convenio: boolean = false;
  id_convenio: string = "1";
  nombre_convenio: string = '';
  nombre_empresa: string = '';
  fecha_egreso: string = '';

  nomina_general: Nomina[];
  nomina_actual: Nomina[];
  nomina_filtrada: Nomina[];

  lista_convenio: any;
  lista_egreso: any;

  displayedColumns: string[] = [
    'Legajo',
    'Apellido y Nombre',
    'CUIL',
    'F.R.P.',
    'NroDoc',
    'Apellido',
    'Nombre',
    'Sexo',
    'FAntigüedad',
    'Ingreso',
    'Egreso',
    'FNacimiento',
    'FecBajaCAT',
    'Convenio',
    'Categoría',
    'Cliente',
    'Unidad',
    'U.O.Propia',
    'Calificación Profesional',
    'O Soc Codigo',
    'O Soc Nombre',
    'Zona',
    'Laboral Barrio',
    'Laboral CP',
    'Laboral Calle',
    'Laboral Nro',
    'Laboral Piso',
    'Laboral Dpto',
    'Laboral Localidad',
    'Laboral Provincia',
    'CentroDeCosto',
    'LugarDePago',
    'SectorInterno',
    'Jornada',
    'Recibos',
    'Legajos',
    'Bruto Imp',
    'Retenciones Imp',
    'Salario Familiar Imp',
    'Exento Imp',
    'Neto Imp',
    '592 - (con aportes) Imp',
    '870 - Cuota Sindical (C) Imp',
    '871 - Aporte Solidario (D) Imp',
    '872 - Federación Imp',
    '873 - Ajte.Dto.Obra Social Imp',
    '874 - Solo Sind. (D) Imp',
    '875 - Solo Sind. (T) Imp',
    '880 - Ajuste Sindicato Imp',
    '900 - Seguro de Vida Imp',
    '901 - Seguro CCT Imp',
    '903 - Seguro (C) Imp',
    '911 - Desc. Ayuda Econ Mutual (No Gananc) Imp',
    '914 - Concepto a Configurar Imp',
    '916 - Mutual(C) Imp',
    '932 - Desc.Tarjeta Magnetica Imp',
    '933 - Retención Directo - Reint Usuaria Imp',
    '994 - Descuento Anticipo Imp',
    '995 - Descuento Anticipo (M) Imp',
    '1200 - Contribución Patronal 1(C7) Imp',
    '1201 - Contribución Patronal 2 (C8) Imp',
    '1202 - Contribución Patronal 3 (C9) Imp',
    '1203 - Ajte. Contribuciones Imp',
    '1204 - Contrib OS Adicional para 931 Imp',
    '1205 - Contribucion Patronal (T)(C7) Imp',
    '1206 - Contribucion Patronal UOCRA(C8) Imp',
    '1207 - Ajte. Contribucion OS Tiempo Parcial Imp',
    '1212 - Contribución Patronal 4(C107) Imp',
    '1213 - Contribución Patronal 5 (C108) Imp',
    '1208 - Contribucion OS S/ NR Imp',
    'TotalImp',
    'Básico',
    'TOTAL'
  ];

  dataSource = new MatTableDataSource<Nomina>();
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  columns = [
    // {titulo: 'ID', name:'ID'},
    { titulo: 'Legajo', name: 'Legajo' },
    { titulo: 'Apellido y Nombre', name: 'Apellido y Nombre' },
    { titulo: 'CUIL', name: 'CUIL' },
    { titulo: 'F.R.P.', name: 'F.R.P.' },
    { titulo: 'Nro. Doc', name: 'NroDoc' },
    { titulo: 'Apellido', name: 'Apellido' },
    { titulo: 'Nombre', name: 'Nombre' },
    { titulo: 'Sexo', name: 'Sexo' },
    { titulo: 'F. Antigüedad', name: 'FAntigüedad' },
    { titulo: 'Ingreso', name: 'Ingreso' },
    { titulo: 'Egreso', name: 'Egreso' },
    { titulo: 'F. Nacimiento', name: 'FNacimiento' },
    { titulo: 'FecBajaCAT', name: 'FecBajaCAT' },
    { titulo: 'Convenio', name: 'Convenio' },
    { titulo: 'Categoría', name: 'Categoría' },
    { titulo: 'Cliente', name: 'Cliente', toolTip: 'Clienteee' },
    { titulo: 'Unidad', name: 'Unidad' },
    { titulo: 'U.O.Propia', name: 'U.O.Propia' },
    { titulo: 'Calificación Profesional', name: 'Calificación Profesional' },
    { titulo: 'O Soc Codigo', name: 'O Soc Codigo' },
    { titulo: 'O Soc Nombre', name: 'O Soc Nombre' },
    { titulo: 'Zona', name: 'Zona' },
    { titulo: 'Laboral Barrio', name: 'Laboral Barrio' },
    { titulo: 'Laboral CP', name: 'Laboral CP' },
    { titulo: 'Laboral Calle', name: 'Laboral Calle' },
    { titulo: 'Laboral Nro', name: 'Laboral Nro' },
    { titulo: 'Laboral Piso', name: 'Laboral Piso' },
    { titulo: 'Laboral Dpto', name: 'Laboral Dpto' },
    { titulo: 'Laboral Localidad', name: 'Laboral Localidad' },
    { titulo: 'Laboral Provincia', name: 'Laboral Provincia' },
    { titulo: 'Centro de Costo', name: 'CentroDeCosto' },
    { titulo: 'Lugar de Pago', name: 'LugarDePago' },
    { titulo: 'Sector Interno', name: 'SectorInterno' },
    { titulo: 'Jornada', name: 'Jornada' },
    { titulo: 'Recibos', name: 'Recibos' },
    { titulo: 'Legajos', name: 'Legajos' },
    { titulo: 'Bruto Imp', name: 'Bruto Imp' },
    { titulo: 'Retenciones Imp', name: 'Retenciones Imp' },
    { titulo: 'Salario Familiar Imp', name: 'Salario Familiar Imp' },
    { titulo: 'Exento Imp', name: 'Exento Imp' },
    { titulo: 'Neto Imp', name: 'Neto Imp' },
    { titulo: '592 Imp', name: '592 - (con aportes) Imp' },
    { titulo: '870 Imp', name: '870 - Cuota Sindical (C) Imp' },
    { titulo: '871 Imp', name: '871 - Aporte Solidario (D) Imp' },
    { titulo: '872 Imp', name: '872 - Federación Imp' },
    { titulo: '873 Imp', name: '873 - Ajte.Dto.Obra Social Imp' },
    { titulo: '874 Imp', name: '874 - Solo Sind. (D) Imp' },
    { titulo: '875 Imp', name: '875 - Solo Sind. (T) Imp' },
    { titulo: '880 Imp', name: '880 - Ajuste Sindicato Imp' },
    { titulo: '900 Imp', name: '900 - Seguro de Vida Imp' },
    { titulo: '901 Imp', name: '901 - Seguro CCT Imp' },
    { titulo: '903 Imp', name: '903 - Seguro (C) Imp' },
    { titulo: '911 Imp', name: '911 - Desc. Ayuda Econ Mutual (No Gananc) Imp' },
    { titulo: '914 Imp', name: '914 - Concepto a Configurar Imp' },
    { titulo: '916 Imp', name: '916 - Mutual(C) Imp' },
    { titulo: '932 Imp', name: '932 - Desc.Tarjeta Magnetica Imp' },
    { titulo: '933 Imp', name: '933 - Retención Directo - Reint Usuaria Imp' },
    { titulo: '994 Imp', name: '994 - Descuento Anticipo Imp' },
    { titulo: '995 Imp', name: '995 - Descuento Anticipo (M) Imp' },
    { titulo: '1200 Imp', name: '1200 - Contribución Patronal 1(C7) Imp' },
    { titulo: '1201 Imp', name: '1201 - Contribución Patronal 2 (C8) Imp' },
    { titulo: '1202 Imp', name: '1202 - Contribución Patronal 3 (C9) Imp' },
    { titulo: '1203 Imp', name: '1203 - Ajte. Contribuciones Imp' },
    { titulo: '1204 Imp', name: '1204 - Contrib OS Adicional para 931 Imp' },
    { titulo: '1205 Imp', name: '1205 - Contribucion Patronal (T)(C7) Imp' },
    { titulo: '1206 Imp', name: '1206 - Contribucion Patronal UOCRA(C8) Imp' },
    { titulo: '1207 Imp', name: '1207 - Ajte. Contribucion OS Tiempo Parcial Imp' },
    { titulo: '1212 Imp', name: '1212 - Contribución Patronal 4(C107) Imp' },
    { titulo: '1213 Imp', name: '1213 - Contribución Patronal 5 (C108) Imp' },
    { titulo: '1208 Imp', name: '1208 - Contribucion OS S/ NR Imp' },
    { titulo: 'TOTAL Imp', name: 'TotalImp' },
    { titulo: 'Básico', name: 'Básico' },
    { titulo: 'TOTAL', name: 'TOTAL' },
  ]
  totalRecibos = 0;
  totalLegajos = 0;
  totalBrutos: number = 0;

  constructor(private convenioServices: ConvenioService) {
    this.nomina_general = [];
    this.nomina_actual = [];
    this.nomina_filtrada = [];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {

    this.convenioServices.listarNominaGeneral().subscribe(
      (res: any) => {
        this.nomina_general = (res);
        Object.assign(this.nomina_actual, this.nomina_general);
        console.log(this.nomina_actual);

        this.dataSource = new MatTableDataSource(this.nomina_actual);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // this.totalRecibos = this.nomina_actual.map(({ Recibos }) => (Recibos)).reduce((acc, value) => acc + value, 0);
        // console.log(this.totalRecibos);
        // this.totalLegajos = this.nomina_actual.map(({ Legajos }) => (Legajos)).reduce((acc, value) => acc + value, 0);
        // console.log(this.totalLegajos);
      });
    this.convenioServices.listarConvenio().subscribe(
      (res: any) => {
        this.lista_convenio = (res);
        console.log(this.lista_convenio);
      });
        
  }

  checkConvenio($event: any): boolean {
    if ($event.target.checked) {
      return this.select_convenio = true;
    }
    return this.select_convenio = false;
  }

  convenioSeleccionado($event: any): void {
    console.log("Elige: " + this.nombre_convenio);

    this.nomina_filtrada = this.nomina_actual.filter(convenio => convenio.Convenio === this.nombre_convenio);
    console.log(this.nomina_filtrada);

    this.dataSource = new MatTableDataSource(this.nomina_filtrada);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


    this.nombre_convenio = '';
    this.nomina_filtrada = [];
  }

  filterData($event: any): void {
    const filterValue = ($event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  xlsxExport() {
    const headings = [['Id', 'Legajo', 'CUIL']];
    const wb = utils.book_new();
    const ws: any = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, this.nomina_actual, {
      origin: 'A2',
      skipHeader: true,
    });
    utils.book_append_sheet(wb, ws, 'Sindicatos');
    writeFile(wb, 'Sindicatos Reportes.xlsx');
  }
  /*
  let dataSource = new MatTableDataSource(this.rows);
  let data = dataSource.filteredData;
  const worksheet: WorkSheet = utils.json_to_sheet(data);

  const workbook: XLSX.WorkBook = {
    Sheets: { data: worksheet },
    SheetNames: ['data']
  };
  XLSX.writeFile(workbook, 'tickets.xls', {
    bookType: 'xls',
    type: 'buffer'
  });
  this.varGlobal.HideLoading();
      });
  */
}
