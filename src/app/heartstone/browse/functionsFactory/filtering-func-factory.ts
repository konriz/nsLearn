import { Card } from "../../heartstone.dto";

export class FilteringFunctionFactory {

    static getFilteringFunction(){
        let func = (card: Card)  => {
            return card.hasImg();
        }
        return func;
    }
}