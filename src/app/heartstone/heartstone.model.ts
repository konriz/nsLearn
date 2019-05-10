import { Injectable } from "@angular/core";
import { HeartstoneService } from "./heartstone.service";
import { Card } from "./heartstone.dto";
import { HeartstoneFilter } from "./search/filters.enum";

@Injectable()
export class HeartstoneModel {
    
    cards: Card[];
    card: Card;

    constructor(private service: HeartstoneService) {

    }

    selectCard(index: number){
        this.card = this.cards[index];
    }

    downloadCards() {
        console.log("Downloading cards")
        this.service.getCards().subscribe(
            res => {
                this.cards = this.createCardsList(res);
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
        console.log(`Downloaded ${setsCount} sets.`)

        Object.keys(cardsSetJson).forEach(set => {
            let cardsInSet = cardsSetJson[set];
            let cardsCount = Object.keys(cardsInSet).length;
            console.log(`Downloaded ${cardsCount} from set ${set}.`)
            for (let card = 0; card < cardsCount; card++) {
                cardsList.push(new Card(cardsInSet[card]));
            }
        });

        this.cards = cardsList;
        return cardsList;
    }

}