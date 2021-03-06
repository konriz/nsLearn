import { Card } from "../../heartstone.dto";

export class FilteringFunctionFactory {

    static getFilteringFunction(filterBy: Filter, value: string){
        let func = (card: Card)  => {
            return card[filterBy].includes(value);
        }
        return func;
    }

    static getFilteringString(filterBy: Filter, value: string) {
        return `${filterBy} = ${value}`;
    }
}

export enum Filter {
    ByName = "name",
    ByClass = "class",
    ByCost = "cost",
    ByAttack = "attack",
    ByHealth = "health",
    ByRarity = "rarity",
    ByType = "type",
}