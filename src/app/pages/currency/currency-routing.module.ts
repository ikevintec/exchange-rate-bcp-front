import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CurrenciesComponent} from "./components/currencies/currencies.component";

const routes: Routes = [
  {path: '', component: CurrenciesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyRoutingModule { }
