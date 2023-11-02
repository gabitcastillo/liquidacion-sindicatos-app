import { Component, OnInit, ViewChild } from '@angular/core';
import { Nomina } from 'src/app/interfaces/Nomina';
import { ConvenioService } from 'src/app/services/convenio.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


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

  nomina_general: Nomina[];
  nomina_actual: Nomina[];
  nomina_filtrada: Nomina[];

  lista_convenio: any;
  lista_empresa: any;

  exporter : any;

  displayedColumns: string[] = ['legajo', 'cuil', 'apellidoNombre', 'frp', 'documento', 'apellido', 'nombre', 'sexo',
    'antiguedad', 'ingreso', 'egreso', 'fnacimiento', 'fecbajacat', 'convenio', 'categoria', 'unidad', 'uopropia', 'calificacion', 'osoccodigo',
    'osocnombre', 'zona', 'laboralbarrio', 'laboralcp', 'laboralcalle', 'laboralnro', 'laboralpiso', 'laboraldepto', 'laborallocalidad', 'laboralprovincia',
    'centrodecosto', 'lugardepago', 'sectorinterno', 'jornada', 'recibos', 'legajos', 'brutoimp', 'retenciones', 'salariofamiliar', 'exentoimp', 'netoimp',
    '592', '870', '871', '872', '873', '874', '875', '880', '900', '901', '903', '911', '914', '916', '932', '933', '994', '995', '1200', '1201', '1202', '1203', '1204', '1205',
    '1206', '1212', '1213', '1208', 'totalImp', 'basico', 'total'
  ];
  dataSource = new MatTableDataSource<Nomina>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columns = [
    { titulo: 'Legajo', name: 'legajo' },
    { titulo: 'Apellido y Nombre', name: 'apellidoNombre' },
    { titulo: 'CUIL', name: 'cuil' },
    { titulo: 'F.R.P', name: 'frp' },
    { titulo: 'Nro. Doc', name: 'documento' },
    { titulo: 'Apellido', name: 'apellido' },
    { titulo: 'Nombre', name: 'nombre' },
    { titulo: 'Sexo', name: 'sexo' },
    { titulo: 'F. Antigüedad', name: 'antiguedad' },
    { titulo: 'Ingreso', name: 'ingreso' },
    { titulo: 'Egreso', name: 'egreso' },
    { titulo: 'F. Nacimiento', name: 'fnacimiento' },
    { titulo: 'FecBajaCAT', name: 'fecbajacat' },
    { titulo: 'Convenio', name: 'convenio' },
    { titulo: 'Categoría', name: 'categoria' },
    { titulo: 'Cliente', name: 'cliente' },
    { titulo: 'Unidad', name: 'unidad' },
    { titulo: 'U.O.Propia', name: 'uopropia' },
    { titulo: 'Calificación', name: 'calificacion' },
    { titulo: 'O Soc Codigo', name: 'osoccodigo' },
    { titulo: 'O Soc Nombre', name: 'osocnombre' },
    { titulo: 'Zona', name: 'zona' },
    { titulo: 'Laboral Barrio', name: 'laboralbarrio' },
    { titulo: 'Laboral CP', name: 'laboralcp' },
    { titulo: 'Laboral Calle', name: 'laboralcalle' },
    { titulo: 'Laboral Nro', name: 'laboralnro' },
    { titulo: 'Laboral Piso', name: 'laboralpiso' },
    { titulo: 'Laboral Dpto', name: 'laboraldepto' },
    { titulo: 'Laboral Localidad', name: 'laborallocalidad' },
    { titulo: 'Laboral Provincia', name: 'laboralprovincia' },
    { titulo: 'Centro de Costo', name: 'centrodecosto' },
    { titulo: 'Lugar de Pago', name: 'lugardepago' },
    { titulo: 'Sector Interno', name: 'sectorinterno' },
    { titulo: 'Jornada', name: 'jornada' },
    { titulo: 'Recibos', name: 'recibos' },
    { titulo: 'Legajos', name: 'legajos' },
    { titulo: 'Bruto Imp', name: 'brutoimp' },
    { titulo: 'Retenciones', name: 'retenciones' },
    { titulo: 'Salario Familiar', name: 'salariofamiliar' },
    { titulo: 'Exento Imp', name: 'exentoimp' },
    { titulo: 'Neto Imp', name: 'netoimp' },
    { titulo: '592', name: '592' },
    { titulo: '870', name: '870' },
    { titulo: '871', name: '871' },
    { titulo: '872', name: '872' },
    { titulo: '873', name: '873' },
    { titulo: '874', name: '874' },
    { titulo: '875', name: '875' },
    { titulo: '880', name: '880' },
    { titulo: '900', name: '900' },
    { titulo: '901', name: '901' },
    { titulo: '903', name: '903' },
    { titulo: '911', name: '911' },
    { titulo: '914', name: '914' },
    { titulo: '916', name: '916' },
    { titulo: '932', name: '932' },
    { titulo: '933', name: '933' },
    { titulo: '994', name: '994' },
    { titulo: '995', name: '995' },
    { titulo: '1200', name: '1200' },
    { titulo: '1201', name: '1201' },
    { titulo: '1202', name: '1202' },
    { titulo: '1203', name: '1203' },
    { titulo: '1204', name: '1204' },
    { titulo: '1205', name: '1205' },
    { titulo: '1206', name: '1206' },
    { titulo: '1207', name: '1207' },
    { titulo: '1212', name: '1212' },
    { titulo: '1213', name: '1213' },
    { titulo: '1208', name: '1208' },
    { titulo: 'Total Imp', name: 'totalImp' },
    { titulo: 'Básico Importe', name: 'basico' },
    { titulo: 'TOTAL Importe', name: 'total' },
  ]

  constructor(private convenioServices: ConvenioService) {
    this.nomina_general = [];
    this.nomina_actual = [];
    this.nomina_filtrada = [];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.convenioServices.listarNominaGeneral().subscribe(
      (res: any) => {
        this.nomina_general = (res);
        Object.assign(this.nomina_actual, this.nomina_general);
        console.log(this.nomina_actual);
        this.dataSource = new MatTableDataSource(this.nomina_actual);
      });
    this.convenioServices.listarConvenio().subscribe(
      (res: any) => {
        this.lista_convenio = res;
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

    this.nomina_filtrada = this.nomina_actual.filter(nomina_actual => nomina_actual.convenio === this.nombre_convenio);
    console.log(this.nomina_filtrada);

    this.dataSource = new MatTableDataSource(this.nomina_filtrada);

    this.nombre_convenio = '';
    this.nomina_filtrada = [];
  }
  empresaSeleccionada($event: any): void {
    console.log("Elige: " + this.nombre_empresa);

    this.lista_empresa = this.lista_empresa
  }

  filterData($event: any): void {
    const filterValue = ($event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
