import { Injectable } from "@angular/core";
import { HeartstoneDatabaseService } from "./persistence/database.service";
import { Card } from "./heartstone.dto";

@Injectable()
export class HeartstoneDao {

    constructor(private database: HeartstoneDatabaseService){
    }

    initDatabase(): Promise<string>{
        return this.database.init();
    }

    insertCards(cards: Card[]){
        this.database.insert(cards);
    }

    getAllCards(){
        this.database.fetch();
    }

    dropTable() {
        this.database.drop();
    }

    clearDatabase(): Promise<string> {
        return this.database.clear();
    }

}