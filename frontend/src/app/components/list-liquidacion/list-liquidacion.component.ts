import { Component, OnInit, ViewChild } from '@angular/core';
import { Nomina } from 'src/app/interfaces/Nomina';
import { ConvenioService } from 'src/app/services/convenio.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
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

  displayedColumns: string[] = ['legajo', 'cuil', 'nombre_apellido', 'frp', 'documento', 'apellido', 'nombre', 'sexo',
    'antiguedad', 'ingreso', 'egreso', 'fnacimiento', 'fecbajacat', 'convenio', 'categoria', 'unidad', 'uopropia', 'calificacion', 'osoccodigo',
    'osocnombre', 'zona', 'laboralbarrio', 'laboralcp', 'laboralcalle', 'laboralnro', 'laboralpiso', 'laboraldepto', 'laborallocalidad', 'laboralprovincia',
    'centrodecosto', 'lugardepago', 'sectorinterno', 'jornada', 'recibos', 'legajos', 'brutoimp', 'retenciones', 'salariofamiliar'];
  dataSource = new MatTableDataSource<Nomina>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columns = [
    { titulo: 'Legajo', name: 'legajo' },
    { titulo: 'Apellido y Nombre', name: 'nombre_apellido' },
    { titulo: 'CUIL', name: 'cuil' },
    { titulo: 'FRP', name: 'frp' },
    { titulo: 'Nro. Documento', name: 'documento' },
    { titulo: 'Apellido', name: 'apellido' },
    { titulo: 'Nombre', name: 'nombre' },
    { titulo: 'Sexo', name: 'sexo' },
    { titulo: 'F. Antiguedad', name: 'antiguedad' },
    { titulo: 'Ingreso', name: 'ingreso' },
    { titulo: 'Egreso', name: 'egreso' },
    { titulo: 'F. Nacimiento', name: 'fnacimiento' },
    { titulo: 'FecBajaCAT', name: 'fecbajacat' },
    { titulo: 'Convenio', name: 'convenio' },
    { titulo: 'Categoria', name: 'categoria' },
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
    // {titulo:'Exento Imp', name:'exentoimp'},
    // {titulo:'Neto Imp', name:'netoimp'},

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
