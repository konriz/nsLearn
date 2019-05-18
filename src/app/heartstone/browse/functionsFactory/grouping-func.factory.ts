import { Card } from "../../heartstone.dto";
import { Group } from "./groups.enum";

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