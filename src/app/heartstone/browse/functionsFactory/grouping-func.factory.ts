import { Card } from "../../heartstone.dto";

export class GroupingFunctionFactory {

    static getGroupingFunction(){
        let func = (card: Card)  => {
            if(card.playerClass){
                return card.playerClass;
            }
            return "";
        }
        return func;
    }
}