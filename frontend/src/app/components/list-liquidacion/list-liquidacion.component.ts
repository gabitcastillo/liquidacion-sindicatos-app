import { Component, OnInit, ViewChild } from '@angular/core';
import { Nomina } from 'src/app/interfaces/Nomina';
import { ConvenioService } from 'src/app/services/convenio.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-list-liquidacion',
  templateUrl: './list-liquidacion.component.html',
  styleUrls: ['./list-liquidacion.component.css'],
})
export class ListLiquidacionComponent implements OnInit {

  //select_convenio: boolean = false;
  id_convenio: string = "1";
  selectConvenio: string = '';
  selectEgreso: string = '';
  selectOSocCodigo: string = '';
  selectCategoria: string = '';
  selectCliente : string = '';
  selectProvincia : string = '';
  selectZona : string = '';
  selectLocalidad: string = '';
  selectRama : string = '';

  btnFiltro: string = 'Ocultar';
  btnFiltroEstado: boolean = false;
  mensajeOk : string = '';
  mostrarMensaje : boolean = false;

  nomina_general: Nomina[];
  nomina_actual: Nomina[];
  nomina_filtrada: Nomina[];

  listConvenio: Array<any> = [];
  objList: any = [];

  displayedColumns: string[] = [
    'id',
    'cuit',
    'sucursal',
    'periodo',
    'nrodocumento',
    'ABM',
    'ingresobaja',
    'apellido',
    'nombre',
    'sexo',
    'categoria',
    'subcategoria',
    'importeremunerativo',
    'importenoremunerativo',
    'esafiliado',
  ];

  dataSource = new MatTableDataSource<Nomina>();
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  columns = [
    { titulo: 'id', name: 'id' },
    { titulo: 'cuit', name: 'cuit' },
    { titulo: 'sucursal', name: 'sucursal' },
    { titulo: 'periodo', name: 'periodo' },
    { titulo: 'nrodocumento', name: 'nrodocumento' },
    { titulo: 'ABM', name: 'ABM' },
    { titulo: 'ingresobaja', name: 'ingresobaja' },
    { titulo: 'apellido', name: 'apellido' },
    { titulo: 'nombre', name: 'nombre' },
    { titulo: 'sexo', name: 'sexo' },
    { titulo: 'categoria', name: 'categoria' },
    { titulo: 'subcategoria', name: 'subcategoria' },
    { titulo: 'importeremunerativo', name: 'importeremunerativo' },
    { titulo: 'importenoremunerativo', name: 'importenoremunerativo' },
    { titulo: 'esafiliado', name: 'esafiliado' },
  ];
  totalRecibos = 0;
  totalLegajos = 0;


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
    this.convenioServices.getExcel().subscribe(
      (res: any) => {
        this.listConvenio = (res.message);
        console.log(this.listConvenio);

        Object.assign(this.nomina_actual, this.listConvenio);
        this.dataSource = new MatTableDataSource(this.nomina_actual);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  btnFiltros($event: any): void {
    if ($event.target && !this.btnFiltroEstado) {
      this.btnFiltroEstado = true;
      this.btnFiltro = 'Mostrar';
    } else {
      this.btnFiltroEstado = false;
      this.btnFiltro = 'Ocultar';
    }
  }

  filterData($event: any): void {
    const filterValue = ($event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  btnDeshacer():void{
    this.selectConvenio = '';
    this.selectEgreso = '';
    this.selectOSocCodigo = '';
    this.selectCategoria = '';
    this.mensajeOk = '';
    this.mostrarMensaje = false;
  }

  btnAceptar():void {

    const objeto: any = {
      id: "",
      convenio: this.selectConvenio,
      egreso: this.selectEgreso,
      osocCodigo: this.selectOSocCodigo,
      cliente: this.selectCliente,
      laboralProvincia : this.selectProvincia,
      zona: this.selectZona,
      laboralLocalidad: this.selectLocalidad,
      rama: this.selectRama
    };
    //console.log(objeto);
    this.objList.push(objeto);

    this.convenioServices.setJSON(this.objList).subscribe(
        (res:any) => {
          //console.log(res.httpErrorResponse.status);
          console.log(res.message);
          if(res.message == 'OK') {
            this.mensajeOk = '¡Archivo generado!';
            this.mostrarMensaje = true;
          }
          // Object.assign(this.nomina_actual, this.listConvenio);
          // this.dataSource = new MatTableDataSource(this.nomina_actual);
          // this.dataSource.paginator = this.paginator;
          // this.dataSource.sort = this.sort;
        }
    );
    this.convenioServices.findConvenio(objeto).subscribe(
      (res: any) => {
        console.log(res.message);
      }
    )
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
 /*
  checkConvenio($event: any): boolean {
    if ($event.target.checked) {
      return this.select_convenio = true;
    }
    return this.select_convenio = false;
  }
  
  convenioSeleccionado($event: any): void {
    console.log("Elige: " + this.selectConvenio);

    this.nomina_filtrada = this.nomina_actual.filter(convenio => convenio.Convenio === this.selectConvenio);
    console.log(this.nomina_filtrada);

    this.dataSource = new MatTableDataSource(this.nomina_filtrada);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


    this.selectConvenio = '';
    this.nomina_filtrada = [];
  }
  */
}
