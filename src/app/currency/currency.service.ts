import { Injectable } from "@angular/core";
import { Http, Headers, Response, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { CurrencyApiConfig as API }  from "./currency.config";

@Injectable()
export class CurrencyService {
    constructor(private http : Http) {}

    getQuotes(){
        return this.http.get(
            API.apiUrl + API.listQuotes,
            {
                headers: this.getHeaders()
            }
        ).pipe(
            map(response => response.text()),
            catchError(this.handleErrors)
        )
    }

    getExchangeRate(currencyFrom: string, currencyTo: string){

        let params = new URLSearchParams();
        params.append(API.from, currencyFrom);
        params.append(API.to, currencyTo);

        return this.http.get(
            API.apiUrl + API.exchange,
            {
                headers: this.getHeaders(),
                search: params
            }
        ).pipe(
            map(response => response.text()),
            catchError(this.handleErrors)
        )
    }

    private getHeaders() {
        let headers = new Headers();
        headers.append("X-RapidAPI-Host", API.apiHost);
        headers.append("X-RapidAPI-Key", API.apiKey);
        return headers;
    }

    private handleErrors(error: Response){
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
}