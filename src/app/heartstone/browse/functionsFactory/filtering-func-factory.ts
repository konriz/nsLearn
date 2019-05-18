import { Card } from "../../heartstone.dto";
import { Filter } from "./filters.enum";

export class FilteringFunctionFactory {

    static getFilteringFunction(filterBy: Filter, value: string){
        let func = (card: Card)  => {
            return card[filterBy].includes(value);
        }
        return func;
    }
}