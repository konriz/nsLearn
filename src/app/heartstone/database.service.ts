import { Injectable } from "@angular/core";
import { Card } from "./heartstone.dto";

var Sqlite = require("nativescript-sqlite");

@Injectable()
export class HeartstoneDatabaseService {

    private database: any;

    constructor() {
        this.init();
    }

    init() {
        (new Sqlite("heartstone.db")).then( db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS cards (" + 
            "id INTEGER PRIMARY KEY AUTOINCREMENT," + 
            "cardId TEXT," + 
            "dbfId TEXT," + 
            "name TEXT," + 
            "cardSet TEXT," + 
            "type TEXT," + 
            "rarity TEXT," + 
            "cost TEXT," + 
            "attack TEXT," + 
            "health TEXT," + 
            "text TEXT," + 
            "flavor TEXT," + 
            "artist TEXT," + 
            "playerClass TEXT," + 
            "img TEXT," + 
            "imgGold TEXT," + 
            "locale TEXT" + 
            ");").then(
                id => {
                    this.database = db;
                    console.log("Database created successfully");
                }, error => {
                    console.log("CREATE TABLE ERROR", error);
                }
            );
            console.log("Database opened successfully.");
        }, error => {
            console.log("OPEN DB ERROR", error);
        });
    }

    insert(cards: Card[]){
        console.log(`Inserting ${cards.length} cards`);
        cards.forEach(card => {
            this.database.execSQL("INSERT INTO cards (cardId, dbfId, name, cardSet, type, rarity, cost, attack, health, text, flavor, artist, playerClass, img, imgGold, locale) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [card.cardId, 
            card.dbfId, card.name, card.cardSet, card.type, card.rarity, card.cost, card.attack, card.health, card.text, card.flavor, card.artist, card.playerClass, card.img, card.imgGold, card.locale]).then(id => {
            },
            error => {
                console.log("INSERT ERROR", error);
            });
        });
        console.log(`Cards inserted`);
    }

    fetch() {
        console.log(`Fetching cards`);
        let cards: Card[] = [];
        this.database.all("SELECT * FROM cards").then(rows => {
            for(let row in rows) {
                cards.push(new Card(this.createCardJson(rows[row])));
            };
        }, error => {
            console.log("SELECT ERROR", error);
        });
        console.log(`${cards.length} cards fetched`);
        return cards;
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
        this.database.execSQL("DROP TABLE cards").then(id => {
            console.log("Table dropped.");
        }, error => {
            console.log("DROP ERROR", error);
        });
    }

    clear() {
        this.database.execSQL("DELETE FROM cards").then(id => {
            console.log("Table cleared.");
        }, error => {
            console.log("DELETE ERROR", error);
        });
    }

}