import { Component, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { HeartstoneModel } from "../heartstone.model";
import { ListViewEventData } from "nativescript-ui-listview";
import { Card } from "../heartstone.dto";
import { RadListViewComponent } from "nativescript-ui-listview/angular/listview-directives";

@Component(
    {
        selector: "ns-heartstone-browse",
        moduleId: module.id,
        templateUrl: "./browse.component.html",
        styleUrls: ["./browse.component.css"]
    }
)
export class BrowseComponent {

    private groupingEnabled: boolean;
    private classGroupingFunction: (item: Card) => string;

    @ViewChild("cardsList") cardsListComponent: RadListViewComponent;

    constructor(private model: HeartstoneModel, private routerExtension: RouterExtensions) {
        this.groupingEnabled = false;
        this.classGroupingFunction = (card: Card) => {
            if(card.playerClass){
                return card.playerClass;
            }
            return "";
        };
    }

    cardDetails(args: ListViewEventData){
        this.model.selectCard(args.index);
        this.routerExtension.navigate(["/heartstone/card"]);
    }

    toggleGrouping() {
        const listView = this.cardsListComponent.listView;
        if(!listView.groupingFunction) {
            listView.groupingFunction = this.classGroupingFunction;
            this.groupingEnabled = true;
        } else {
            listView.groupingFunction = undefined;
            this.groupingEnabled = false;
        }

    }

    goBack(){
        this.routerExtension.back();
    }
}