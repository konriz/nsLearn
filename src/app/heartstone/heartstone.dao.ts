import { Injectable } from "@angular/core";
import { HeartstoneDatabaseService } from "./database.service";
import { Card } from "./heartstone.dto";

@Injectable()
export class HeartstoneDao {

    constructor(private database: HeartstoneDatabaseService){
    }

    insertCard(card: Card){
        this.database.insert([card]);
    }

    insertCards(cards: Card[]){
        this.database.insert(cards);
    }

    getAllCards(){
        return this.database.fetch();
    }

    dropTable() {
        this.database.drop();
    }

    clearDatabase() {
        this.database.clear();
    }

}