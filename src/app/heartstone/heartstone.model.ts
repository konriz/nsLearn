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
    health: string;
    text: string;
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
        this.health = card["health"];
        this.text = card["text"];
        this.artist = card["artist"];
        this.playerClass = card["playerClass"];
        this.img = card["img"];
        this.imgGold = card["imgGold"];
        this.locale = card["locale"];
    }

    toString(){
        let output = 
`Card name:
${this.name}
Card text:
${this.text}`;
        return output;
    }
}