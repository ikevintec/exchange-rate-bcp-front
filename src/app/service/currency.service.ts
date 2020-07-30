import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Currency} from "../domain/currency";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CurrencyService {

    baseUrl: string = environment.endpointApi;

    constructor(private http: HttpClient) {
    }

    findAll(): Observable<Currency[]> {
        return this.http.get<Currency[]>(`${this.baseUrl}/currencies`);
    }

    findById(id: number): Observable<Currency> {
        return this.http.get<Currency>(`${this.baseUrl}/currencies/${id}`);
    }

    save(model: Currency): Observable<Currency> {
        return this.http.post<Currency>(`${this.baseUrl}/currencies`, model);
    }

    update(id, model: Currency): Observable<Currency> {
        return this.http.put<Currency>(`${this.baseUrl}/currencies/${id}`, model);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/currencies/${id}`);
    }
}
