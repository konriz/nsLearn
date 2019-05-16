import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { HeartstoneConfig } from "./heartstone.config";
import { catchError, map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class HeartstoneService {

    constructor(private http: Http) { }

    getInfo() {
        return this.http.get(
            HeartstoneConfig.info,
            { headers: this.getHeaders() }
        ).pipe(
            catchError(this.handleErrors)
        )
    }

    getCards() {
        return this.http.get(
            HeartstoneConfig.cards,
            { headers: this.getHeaders() }
        ).pipe(
            map(response => response.json()),
            catchError(this.handleErrors)
        )
    }

    private getHeaders(){
        let headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers.append("X-RapidAPI-host", HeartstoneConfig.host);
        headers.append("X-RapidAPI-Key", HeartstoneConfig.appKey);
        return headers;
    }

    private handleErrors(error: Response){
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }

}