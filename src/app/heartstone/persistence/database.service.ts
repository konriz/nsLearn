import { Injectable, OnInit } from "@angular/core";
import { Card } from "../heartstone.dto";
import { HeartstoneConfig } from "../heartstone.config";
import { QueryBuilder } from "./query-builder";

const TAG = "Database: ";

@Injectable()
export class HeartstoneDatabaseService {

    private database: any;
    constructor() {
        let dbName = HeartstoneConfig.useDatabase ? HeartstoneConfig.dbName : ":memory:";
        QueryBuilder.openDatabase(dbName)
        .then(
            database => {
                QueryBuilder.createTable(database).then(
                    () => this.database = database
                )
            }
        );
    }

    clear(): Promise<any> {
        return QueryBuilder.deleteAllCards(this.database);
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
                        console.log(TAG, `${cards.length} cards fetched.`);
                        resolve(cards);
                    }
                );
            }
        )
    }

    private createCards(rows): Card[]{
        let cards = [];
        for(var row in rows){
            cards.push(new Card(this.createCardJson(rows[row])));
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
        .then(console.log(TAG, "Table dropped."));
    }
}