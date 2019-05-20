import { Card } from "../../heartstone.dto";

export class SortingFunctionFactory {

    static getSortingFunction(sortBy: Sort, order: Order){
        let func = (card: Card, otherCard: Card)  => {
            let compare = otherCard[sortBy].localeCompare(card[sortBy]) * order;
            return compare;
        }
        return func;
    }

    static getSortingString(sortBy: Sort, order: Order) {
        let orderString = (order === 1 ? "ASC" : "DESC");
        return `${sortBy} - ${orderString}`;
    }
}

export enum Order {
    Ascending = 1,
    Descending = -1
}

export enum Sort {
    ByName = "name",
    ByClass = "class",
    ByCost = "cost",
    ByAttack = "attack",
    ByHealth = "health",
    ByRarity = "rarity",
    ByType = "type",
}