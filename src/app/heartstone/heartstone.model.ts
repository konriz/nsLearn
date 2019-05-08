export class Info {

    classes : string[];
    races : string[];
    factions : string[];

    constructor(info: JSON){
        this.classes = info["classes"];
        this.races = info["races"];
        this.factions = info["factions"];
    }
}

export class Card {

    cardId: string;
    dbfId: string;
    name: string;
    cardSet: string;
    type: string;
    rarity: string;
    health: string;
    cost: string;
    attack: string;
    text: string;
    flavor: string;
    artist: string;
    playerClass: string;
    img: string;
    imgGold: string;
    locale: string;

    constructor(card: JSON){
        this.cardId = card["cardId"];
        this.dbfId = card["dbfId"];
        this.name = card["name"];
        this.cardSet = card["cardSet"];
        this.type = card["type"];
        this.rarity = card["rarity"];
        this.cost = card["cost"];
        this.attack = card["attack"];
        this.health = card["health"];
        this.text = card["text"];
        this.flavor = card["flavor"];
        this.artist = card["artist"];
        this.playerClass = card["playerClass"];
        this.img = this.stripHttp(card["img"]);
        this.imgGold = this.stripHttp(card["imgGold"]);
        this.locale = card["locale"];
    }

    private stripHttp(url: string){
        return url.replace("http://", "https://");
    }
}