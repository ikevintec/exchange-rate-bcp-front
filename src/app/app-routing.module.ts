import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'currencies'
  },
  {path: 'currencies', loadChildren: () => import('./pages/currency/currency.module').then(m => m.CurrencyModule)},
  {path: 'exchange-rate', loadChildren: () => import('./pages/exchange-rate/exchange-rate.module').then(m => m.ExchangeRateModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
