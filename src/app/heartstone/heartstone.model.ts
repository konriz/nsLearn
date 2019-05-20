import { Injectable } from "@angular/core";
import { HeartstoneService } from "./heartstone.service";
import { Card } from "./heartstone.dto";
import { HeartstoneDao } from "./heartstone.dao";
import { HeartstoneConfig } from "./heartstone.config";

@Injectable()
export class HeartstoneModel {
    
    cards: Card[];
    selectedCards: Card[];
    card: Card;
    private _initPromise: Promise<string>;
    private _cardsPromise: Promise<Card[]>;
    private _downloadPromise: Promise<Card[]>;

    constructor(private service: HeartstoneService, private dao: HeartstoneDao) {
    }

    init(): Promise<string> {
        if(!this._initPromise){
            this._initPromise = new Promise((resolve) => {
                if(HeartstoneConfig.useDatabase) {
                    this.dao.initDatabase()
                    .then(log => {
                        console.log(log);
                        if(HeartstoneConfig.clearDatabase){
                            this.dao.clearDatabase()
                            .then(log => {
                                console.log(log);
                            });
                        }
                    })
                    .then( () => resolve("Database initialised.")
                    );
                } else {
                    resolve("Database is off.");
                }
            })
        }
        return this._initPromise;
    }

    getCards() {
        this.init()
        .then( () => {
            this.downloadCards().then(cards => {
                this.cards = cards;
            });
        })
    }

    selectCard(index: number){
        this.card = this.cards[index];
    }

    private saveCards(cards: Card[]){
        this.dao.insertCards(cards);
    }

    private downloadCards(): Promise<Card[]> {
        if(!this._downloadPromise){
            console.log("Downloading cards");
            this._downloadPromise = new Promise((resolve, reject) => {
                this.service.getCards().subscribe(
                    res => resolve(this.createCardsList(res)),
                    err => reject(err)
                );
            });
        }
        return this._downloadPromise;
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