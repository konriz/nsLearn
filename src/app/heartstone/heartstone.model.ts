import { Injectable, OnInit } from "@angular/core";
import { Card } from "./heartstone.dto";
import { HeartstoneRepository } from "./heartstone.repository";

@Injectable()
export class HeartstoneModel {
    
    cards: Card[];
    selectedCards: Card[];
    card: Card;

    constructor(private repository: HeartstoneRepository) {
    }

    loadCards() {
        this.repository.getCards().then(cards => this.setCards(cards));
    }

    private setCards(cards: Card[]){
        this.cards = cards;
    }

    selectCard(index: number){
        this.card = this.cards[index];
    }
}