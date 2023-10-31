import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule, } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListLiquidacionComponent } from './components/list-liquidacion/list-liquidacion.component';
import { FooterComponent } from './components/footer/footer.component';
// Servicios
import { ConvenioService } from './services/convenio.service';
import { DataTableComponent } from './components/data-table/data-table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListLiquidacionComponent,
    FooterComponent,
    DataTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxDatatableModule
  ],
  providers: [ConvenioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
