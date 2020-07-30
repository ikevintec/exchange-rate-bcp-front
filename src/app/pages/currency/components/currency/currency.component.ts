import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef, MessageService} from "primeng";
import {Currency} from "../../../../domain/currency";
import {CurrencyService} from "../../../../service/currency.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  modelForm: FormGroup;
  constructor(private fb: FormBuilder,
              private ref: DynamicDialogRef,
              private config: DynamicDialogConfig,
              private currencyService: CurrencyService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.builderForm();
  }

  builderForm() {
    this.modelForm = this.fb.group({
      id: [undefined, []],
      code: [undefined, [Validators.required]],
      name: [undefined, [Validators.required]],
      nationalCurrency: [false, [Validators.required]],
      exchangeRate: [undefined, [Validators.required]]
    });
    if (this.modelEdit) {
      this.modelForm.patchValue(this.modelEdit);
    }
  }

  get model(): Currency {
    return this.modelForm.getRawValue();
  }

  get modelEdit(): Currency {
    return this.config.data.currency;
  }

  save() {
    const obsSave = this.modelEdit ? this.currencyService.update(this.modelEdit.id, this.model) :
      this.currencyService.save(this.model);
    obsSave.subscribe(data => {
      this.messageService.add({severity:'success', summary:'Guardar moneda', detail:'Operación exitosa!'});
      this.ref.close(data);
    }, error => {
      const httpErrorResponse: HttpErrorResponse = error;
      this.messageService.add({severity:'error', summary: `Error ${httpErrorResponse.error.code}`, detail: httpErrorResponse.error.message});
    });
  }

}
