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
        if(this.database) {
            QueryBuilder.deleteAllCards(this.database).then(
                () => {
                    return Promise.resolve("Database cleared.")
                }
            )
        }
        return new Promise((resolve) => {
            QueryBuilder.database(HeartstoneConfig.dbName)
            .then(
                db => QueryBuilder.createTable(db)
                    .then(this.database = db)
                    .then(QueryBuilder.deleteAllCards(this.database))
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

    insert(cards: Card[]): Promise<string> {
        let counter = 0;
        return new Promise(
            resolve => {
                cards.forEach(card => {
                    QueryBuilder.insertCard(this.database, card)
                    .then(counter ++);
                });
                resolve(`${counter} cards inserted.`)
            }
        );
    }

    fetch(): Promise<Card[]> {
        return new Promise(
            resolve => {
                QueryBuilder.getAllCards(this.database)
                .then(
                    rows => {
                        let cards = this.createCards(rows);
                        console.log(`${cards.length} cards fetched.`);
                        resolve(cards);
                    }
                );
            }
        )
    }

    private createCards(rows): Card[]{
        let cards = [];
        for(var row in rows){
            cards.push(new Card(this.createCardJson(row)));
        }
        return cards;
    }

    private createCardJson(row): JSON {
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