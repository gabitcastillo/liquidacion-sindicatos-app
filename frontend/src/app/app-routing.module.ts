import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListLiquidacionComponent } from './components/list-liquidacion/list-liquidacion.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {DataTableComponent} from './components/data-table/data-table.component';
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
