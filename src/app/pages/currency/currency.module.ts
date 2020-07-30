import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyRoutingModule } from './currency-routing.module';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import {SharedModule} from "../../shared/shared.module";
import { CurrencyComponent } from './components/currency/currency.component';
import {DialogService} from "primeng";


@NgModule({
  declarations: [CurrenciesComponent, CurrencyComponent],
  imports: [
    CommonModule,
    CurrencyRoutingModule,
    SharedModule
  ],
  entryComponents: [CurrencyComponent],
  providers: [DialogService]
})
export class CurrencyModule { }
