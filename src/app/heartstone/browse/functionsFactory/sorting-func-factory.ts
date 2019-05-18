import { Card } from "../../heartstone.dto";
import { Sort } from "./sort.enum";

export class SortingFunctionFactory {

    static getSortingFunction(sortBy: Sort){
        let func = (card: Card, otherCard: Card)  => {
            return otherCard[sortBy].localeCompare(card[sortBy]);
        }
        return func;
    }
}