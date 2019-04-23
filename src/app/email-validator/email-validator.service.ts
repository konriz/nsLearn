import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { EmailValidatorConfig } from "./email-validator.config";
 
@Injectable()
export class EmailValidatorService {
    constructor(private http: Http){ }

    validate(email: string){

        if (!email){
            return throwError("Empty email!");
        }

        return this.http.get(
            EmailValidatorConfig.apiUrl + email,
            { headers: this.getHeaders() }
        ).pipe(
            map(response => response.json()["isValid"]),
            catchError(this.handleErrors)
        )
    }

    private getHeaders(){
        let headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers.append("X-RapidAPI-host", EmailValidatorConfig.host);
        headers.append("X-RapidAPI-Key", EmailValidatorConfig.appKey);
        return headers;
    }

    private handleErrors(error: Response){
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
}