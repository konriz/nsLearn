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
    private sortingEnabled: boolean;
    private filteringEnabled: boolean;


    @ViewChild("cardsList") cardsListComponent: RadListViewComponent;

    constructor(private model: HeartstoneModel, private routerExtension: RouterExtensions) {
        this.groupingEnabled = false;
        this.sortingEnabled = false;
        this.filteringEnabled = false;
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

    private classGroupingFunction(card: Card) {
        if(card.playerClass){
            return card.playerClass;
        }
        return "";
    }

    toggleSorting() {
        const listView = this.cardsListComponent.listView;
        if(!listView.sortingFunction) {
            listView.sortingFunction = this.nameSortingFunction;
            this.sortingEnabled = true;
        } else {
            listView.sortingFunction = undefined;
            this.sortingEnabled = false;
        }
    }

    private nameSortingFunction(card: Card, otherCard: Card): number {
        let res = otherCard.name.localeCompare(card.name);
        return res;
    }

    toggleFiltering() {
        const listView = this.cardsListComponent.listView;
        if(!listView.filteringFunction) {
            listView.filteringFunction = this.imgFilteringFunction;
            this.filteringEnabled = true;
        } else {
            listView.filteringFunction = undefined;
            this.filteringEnabled = false;
        }
    }

    private imgFilteringFunction(card: Card): boolean {
        return card.hasImg();
    }

    goBack(){
        this.routerExtension.back();
    }
}