import { Injectable, OnInit } from "@angular/core";
import { Card } from "./heartstone.dto";
import { HeartstoneRepository } from "./heartstone.repository";

@Injectable()
export class HeartstoneModel {
    
    private _cards: Card[];
    selectedCards: Card[];
    card: Card;

    constructor(private repository: HeartstoneRepository) {
    }

    loadCards(): Promise<Card[]> {
        return new Promise(
            (resolve) => {
                this.repository.getCards()
                .then(
                    cards => {
                        this.cards = cards;
                        resolve(cards);
                    }
                )
            }
        )
    }

    set cards(cards: Card[]){
        this._cards = cards;
    }

    get cards() {
        return this._cards;
    }

    selectCard(index: number){
        this.card = this.cards[index];
    }
}