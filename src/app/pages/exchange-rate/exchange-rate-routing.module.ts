import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExchangeRateComponent} from "./components/exchange-rate/exchange-rate.component";


const routes: Routes = [
  {path: '', component: ExchangeRateComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExchangeRateRoutingModule { }
