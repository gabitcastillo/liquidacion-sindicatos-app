import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  
  titulo : string = 'LIQUIDADOR DE SINDICATOS';
  
  constructor() {
   }

  ngOnInit(): void {
  }
  

}
