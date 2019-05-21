import { Injectable } from "@angular/core";
import { HeartstoneDatabaseService } from "./persistence/database.service";
import { Card } from "./heartstone.dto";
import { HeartstoneService } from "./heartstone.service";
import { HeartstoneConfig } from "./heartstone.config";

@Injectable()
export class HeartstoneRepository {

    private _cards: Promise<Card[]>;
    
    constructor(private api: HeartstoneService, private database: HeartstoneDatabaseService){
    }

    getCards(): Promise<Card[]> {

        return new Promise(
            resolve => {
                this.downloadCards().then(
                    (cards) => {
                        if(HeartstoneConfig.useDatabase){
                            this.database.init().then(
                                log => {
                                    console.log(log);
                                    this.database.insert(cards)
                                    .then(
                                        log => {
                                            console.log(log);
                                            this.database.fetch().then(
                                                dbCards => {
                                                    resolve(dbCards);
                                                }
                                            );
                                    });
                                }
                            )
                        }
                        resolve(cards);
                    }
                )
            }
        )
    }

    private downloadCards(): Promise<Card[]> {
        if(!this._cards){
            this._cards = new Promise((resolve, reject) => {
                this.api.getCards().subscribe(
                    res => resolve(this.createCardsList(res)),
                    err => reject(err)
                );
            });
        }
        return this._cards;
    }

    private initDatabase(): Promise<string>{
        return this.database.init();
    }

    private insertCards(cards: Card[]){
        this.database.insert(cards);
    }

    private getAllCards(){
        this.database.fetch();
    }

    private dropTable() {
        this.database.drop();
    }

    private clearDatabase(): Promise<string> {
        return this.database.clear();
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
        console.log(`Downloaded ${setsCount} sets with ${cardsList.length} cards total.`)
        return cardsList;
    }

}