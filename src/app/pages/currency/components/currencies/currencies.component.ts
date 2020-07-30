import { Component, OnInit } from '@angular/core';
import {Currency} from "../../../../domain/currency";
import {CurrencyService} from "../../../../service/currency.service";
import {DialogService} from "primeng";
import {CurrencyComponent} from "../currency/currency.component";

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent implements OnInit {

  currencies: Currency[] = [];

  constructor(private currencyService: CurrencyService,
              private dialogService: DialogService) { }

  ngOnInit(): void {
    this.loadCurrencies();
  }

  loadCurrencies(): void {
    this.currencyService.findAll().subscribe(data => {
      this.currencies = data;
    });
  }


  openDialogCurrency(currency?: Currency) {
    const ref = this.dialogService.open(CurrencyComponent, {
      header: currency ? 'Editar moneda' : 'Nueva moneda',
      data: {
        ...(currency && {currency})
      },
      width: '50%'
    });
    ref.onClose.subscribe(c => {
      if (c) {
        this.loadCurrencies()
      }
    });
  }

  delete(currency: Currency) {
    this.currencyService.delete(currency.id).subscribe(() => this.loadCurrencies());
  }

}
