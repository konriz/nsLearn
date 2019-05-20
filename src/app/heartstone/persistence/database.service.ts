import { Injectable } from "@angular/core";
import { Card } from "../heartstone.dto";
import { HeartstoneConfig } from "../heartstone.config";
import { QueryBuilder } from "./query-builder";


@Injectable()
export class HeartstoneDatabaseService {

    private database: any;

    constructor() {
    }

    init(): Promise<string> {
        return new Promise((resolve) => {
            QueryBuilder.database(HeartstoneConfig.dbName)
            .then(db => QueryBuilder.createTable(db)
            .then(() => this.database = db)
            .then(resolve("Database created."))
        );
        });
        
    }

    clear(): Promise<string> {
        return new Promise((resolve) => {
            QueryBuilder.deleteAllCards(this.database)
            .then(resolve("Table cleared.")
            );
        });
    }

    insert(cards: Card[]){
        cards.forEach(card => {
            QueryBuilder.insertCard(this.database, card)
            .then();
        });
        console.log("Cards inserted.")
    }

    fetch() {
        QueryBuilder.getAllCards(this.database)
        .then(rows => {
            console.log("Rows fetched.")
            return rows;
        });
        
    }

    private createCardJson(row){
        let cardJson: any = {
            "cardId": row[1], 
            "dbfId": row[2], 
            "name": row[3],
            "cardSet": row[4], 
            "type": row[5], 
            "rarity": row[6], 
            "cost": row[7], 
            "attack": row[8], 
            "health": row[9], 
            "text": row[10], 
            "flavor": row[11], 
            "artist": row[12], 
            "playerClass": row[13], 
            "img": row[14], 
            "imgGold": row[15], 
            "locale": row[16]
        };
        return <JSON>cardJson;
    }

    drop() {
        QueryBuilder.dropDatabase(this.database)
        .then(console.log("Table dropped."));
    }

    

}