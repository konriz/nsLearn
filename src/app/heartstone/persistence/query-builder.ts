import { Card } from "../heartstone.dto";
var Sqlite = require("nativescript-sqlite");

export class QueryBuilder {

    static database(dbName: string) {
        return new Sqlite(dbName);
    } 

    static createTable(db){
        return db.execSQL("CREATE TABLE IF NOT EXISTS cards (" + 
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
        ");");
    }

    static insertCard(database, card: Card){
        return database.execSQL("INSERT INTO cards (cardId, dbfId, name, cardSet, type, rarity, cost, attack, health, text, flavor, artist, playerClass, img, imgGold, locale) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [card.cardId, 
            card.dbfId, card.name, card.cardSet, card.type, card.rarity, card.cost, card.attack, card.health, card.text, card.flavor, card.artist, card.playerClass, card.img, card.imgGold, card.locale]);
    }

    static getAllCards(database){
        return database.all("SELECT * FROM cards");
    }

    static dropDatabase(database){
        return database.execSQL("DROP TABLE cards");
    }

    static deleteAllCards(database){
        return database.execSQL("DELETE FROM cards");
    }
}