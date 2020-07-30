import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ExchangeRateRequest} from "../domain/exchange-rate-request";
import {ExchangeRateResponse} from "../domain/exchange-rate-response";

@Injectable({
    providedIn: 'root'
})
export class ExchangeRateService {

    baseUrl: string = environment.endpointApi;

    constructor(private http: HttpClient) {
    }

    exchange(model: ExchangeRateRequest): Observable<ExchangeRateResponse> {
        return this.http.post<ExchangeRateResponse>(`${this.baseUrl}/exchange-rates`, model);
    }
}
