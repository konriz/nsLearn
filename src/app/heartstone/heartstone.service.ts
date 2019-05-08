import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { HeartstoneConfig } from "./heartstone.config";
import { catchError, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { HeartstoneFilter } from "./search/filters.enum";
import { Card } from "./heartstone.model";

@Injectable()
export class HeartstoneService {

    cards: Card[];
    card: Card;

    constructor(private http: Http) { }

    getInfo() {
        return this.http.get(
            HeartstoneConfig.info,
            { headers: this.getHeaders() }
        ).pipe(
            catchError(this.handleErrors)
        )
    }

    getByFilter(filter: HeartstoneFilter, value: string) {
        return this.http.get(
            HeartstoneConfig.cards + filter.valueOf() + value,
            { headers: this.getHeaders() }
        ).pipe(
            map(response => this.createCardsList(response.json())),
            catchError(this.handleErrors)
        )
    }

    selectCard(index: number){
        this.card = this.cards[index];
    }

    private createCardsList(cardsJson: JSON){
        let cardsList: Card[] = [];
        let cardsCount = Object.keys(cardsJson).length;

        for (let index = 0; index < cardsCount; index++) {
            cardsList.push(new Card(cardsJson[index]));
        }
        this.cards = cardsList;
        return cardsList;
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