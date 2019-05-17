import { Card } from "../../heartstone.dto";

export class SortingFunctionFactory {

    static getSortingFunction(){
        let func = (card: Card, otherCard: Card)  => {
            return otherCard.name.localeCompare(card.name);
        }
        return func;
    }
}