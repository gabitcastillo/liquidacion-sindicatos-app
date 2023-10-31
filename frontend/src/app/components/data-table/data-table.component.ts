import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  displayColumn: string[] = ['id', 'legajo', 'cuil', 'nombre'];
  dataSource: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
