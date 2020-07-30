import {Component, OnInit} from '@angular/core';
import {CurrencyService} from "../../../../service/currency.service";
import {ExchangeRateService} from "../../../../service/exchange-rate.service";
import {MessageService, SelectItem} from "primeng";
import {map} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ExchangeRateRequest} from "../../../../domain/exchange-rate-request";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss']
})
export class ExchangeRateComponent implements OnInit {

  currencies: SelectItem[];
  focusFirst = true;
  modelForm: FormGroup;
  exchangeRate: number;

  constructor(private currencyService: CurrencyService,
              private exchangeRateService: ExchangeRateService,
              public fb: FormBuilder,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.builderForm();
    this.loadCurrencies();
  }

  builderForm() {
    this.modelForm = this.fb.group({
      firstSelectedCurrency: [undefined, [Validators.required]],
      secondSelectedCurrency: [undefined, [Validators.required]],
      firstAmount: [undefined, [Validators.required]],
      secondAmount: [undefined, []]
    });
  }

  get labelLegentFirst(): string {
    return this.focusFirst ? 'Tienes' : 'Necesitas';
  }

  loadCurrencies(): void {
    this.currencyService.findAll()
      .pipe(map(data => data.map(c => ({
        label: c.name, value: c.code
      }) as SelectItem)))
      .subscribe(data => {
        this.currencies = data;
        this.modelForm.patchValue({
          firstSelectedCurrency: this.currencies.map(c => c.value).find(c => c === 'USD'),
          secondSelectedCurrency: this.currencies.map(c => c.value).find(c => c === 'PEN'),
          firstAmount: 1000
        });
        this.exchange();
      });
  }

  changeFirstAmount() {
    this.focusFirst = true;
    this.modelForm.get('firstAmount').setValidators([Validators.required]);
    this.modelForm.get('secondAmount').clearValidators();
    this.exchange();
  }

  changeSecondAmount() {
    this.focusFirst = false;
    this.modelForm.get('secondAmount').setValidators([Validators.required]);
    this.modelForm.get('firstAmount').clearValidators();
    this.exchange();
  }

  exchange() {
    const formData = this.modelForm.getRawValue();
    const amount = this.focusFirst ? formData.firstAmount : formData.secondAmount;
    const sourceCurrencyCode = this.focusFirst ? formData.firstSelectedCurrency : formData.secondSelectedCurrency;
    const targetCurrencyCode = !this.focusFirst ? formData.firstSelectedCurrency : formData.secondSelectedCurrency;
    if (this.modelForm.valid) {
      const exchangeRequest: ExchangeRateRequest = {
        amount,
        sourceCurrencyCode,
        targetCurrencyCode,
      }
      this.exchangeRateService.exchange(exchangeRequest).subscribe(data => {
        this.exchangeRate = data.exchangeRate;
        if (this.focusFirst) {
          this.modelForm.patchValue({
            secondAmount: data.amountExchangeRate
          });
        } else {
          this.modelForm.patchValue({
            firstAmount: data.amountExchangeRate
          });
        }
      }, error => {
        const httpErrorResponse: HttpErrorResponse = error;
        this.messageService.add({severity:'error', summary: `Error ${httpErrorResponse.error.code}`, detail: httpErrorResponse.error.message});
      });
    }
  }

}
