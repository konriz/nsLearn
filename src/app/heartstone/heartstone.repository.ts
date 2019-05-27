import { Injectable } from "@angular/core";
import { HeartstoneDatabaseService } from "./persistence/database.service";
import { Card } from "./heartstone.dto";
import { HeartstoneService } from "./heartstone.service";
import { HeartstoneConfig } from "./heartstone.config";

const TAG = "Repository:";

@Injectable()
export class HeartstoneRepository {

    constructor(private api: HeartstoneService, private database: HeartstoneDatabaseService){
    }

    getCards(): Promise<Card[]> {
        return Promise.resolve(this.getAllCards())
    }

    private downloadCards(): Promise<Card[]> {
        return new Promise((resolve, reject) => {
            this.api.getCards().subscribe(
                res => resolve(this.createCardsList(res)),
                reject
            )
        });
    }

    private insertCards(cards: Card[]): Promise<string>{
        return this.database.insert(cards);
    }

    private getAllCards(): Promise<Card[]>{
        return new Promise<Card[]>(
            resolve => {
                this.database.fetch()
                .then(
                    cards => resolve(cards))
                .catch(
                    empty => {
                    this.downloadCards()
                    .then(cards => {
                        this.insertCards(cards)
                        .then(log => {
                            console.log(TAG, log);
                            resolve(this.getAllCards());
                        })
                    })
                })
            },
        )
    }

    private dropTable() {
        this.database.drop();
    }

    private createCardsList(cardsSetJson: JSON){
        let cardsList: Card[] = [];
        let setsCount = Object.keys(cardsSetJson).length;

        Object.keys(cardsSetJson).forEach(set => {
            let cardsInSet = cardsSetJson[set];
            let cardsCount = Object.keys(cardsInSet).length;
            for (let card = 0; card < cardsCount; card++) {
                cardsList.push(new Card(cardsInSet[card]));
            }
        });
        console.log(TAG, `Downloaded ${setsCount} sets with ${cardsList.length} cards total.`)
        return cardsList;
    }

}