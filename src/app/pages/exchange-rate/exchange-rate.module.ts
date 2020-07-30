import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExchangeRateRoutingModule } from './exchange-rate-routing.module';
import { ExchangeRateComponent } from './components/exchange-rate/exchange-rate.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [ExchangeRateComponent],
  imports: [
    CommonModule,
    ExchangeRateRoutingModule,
    SharedModule
  ]
})
export class ExchangeRateModule { }
