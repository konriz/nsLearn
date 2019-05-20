import { Card } from "../../heartstone.dto";

export class GroupingFunctionFactory {

    static getGroupingFunction(groupBy: Group){
        let func = (card: Card)  => {
            if(card[groupBy]){
                return card[groupBy];
            }
            return "";
        }
        return func;
    }
}

export enum Group {
    ByName = "name",
    ByClass = "class",
    ByCost = "cost",
    ByAttack = "attack",
    ByHealth = "health",
    ByRarity = "rarity",
    ByType = "type",
}