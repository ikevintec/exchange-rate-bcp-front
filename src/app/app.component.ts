import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'exchange-rate-front';
  items: MenuItem[];

  ngOnInit(): void {
    this.items = [
      {label: 'Monedas', routerLink: 'currencies'},
      {label: 'Tipo de cambio', routerLink: 'exchange-rate'}
    ];
  }
}
