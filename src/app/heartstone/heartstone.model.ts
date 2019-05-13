import { Injectable } from "@angular/core";
import { HeartstoneService } from "./heartstone.service";
import { Card } from "./heartstone.dto";
import { HeartstoneFilter } from "./search/filters.enum";
import { HeartstoneDao } from "./heartstone.dao";
import { HeartstoneConfig } from "./heartstone.config";

@Injectable()
export class HeartstoneModel {
    
    cards: Card[];
    selectedCards: Card[];
    card: Card;

    constructor(private service: HeartstoneService, private dao: HeartstoneDao) {
    }

    init(){
        this.dao.clearDatabase();
        this.downloadCards();
    }

    selectCard(index: number){
        this.card = this.cards[index];
    }

    private downloadCards() {
        console.log("Downloading cards")
        this.service.getCards().subscribe(
            res => {
                let downloadedCards = this.createCardsList(res);

                if(HeartstoneConfig.useDatabase){
                    this.dao.insertCards(downloadedCards);
                    this.cards = this.dao.getAllCards();
                } else {
                    this.cards = downloadedCards;
                }
            },
            err => {
                console.log(err);
            }
        );
    }

    getByFilter(filter: HeartstoneFilter, value: string) {
        if(this.cards) {
            return this.cards.slice(0, 9);
        }
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