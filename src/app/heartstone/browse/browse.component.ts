import { Component, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { HeartstoneModel } from "../heartstone.model";
import { ListViewEventData } from "nativescript-ui-listview";
import { Card } from "../heartstone.dto";
import { RadListViewComponent } from "nativescript-ui-listview/angular/listview-directives";
import { SortingFunctionFactory } from "./functionsFactory/sorting-func-factory";
import { FilteringFunctionFactory } from "./functionsFactory/filtering-func-factory";
import { GroupingFunctionFactory } from "./functionsFactory/grouping-func.factory";

@Component(
    {
        selector: "ns-heartstone-browse",
        moduleId: module.id,
        templateUrl: "./browse.component.html",
        styleUrls: ["./browse.component.css"]
    }
)
export class BrowseComponent {

    private groupingText = "Group by: ";
    private groupingMode = "";
    private sortingText = "Sort by: ";
    private sortingMode = "";
    private filteringText = "Filter by: ";
    private filteringMode = "";


    @ViewChild("cardsList") cardsListComponent: RadListViewComponent;

    constructor(private model: HeartstoneModel, private routerExtension: RouterExtensions) {
    }

    cardDetails(args: ListViewEventData){
        this.model.selectCard(args.index);
        this.routerExtension.navigate(["/heartstone/card"]);
    }

    toggleGrouping() {
        const listView = this.cardsListComponent.listView;
        if(!listView.groupingFunction) {
            listView.groupingFunction = GroupingFunctionFactory.getGroupingFunction();
            this.groupingMode = "Character";
        } else {
            listView.groupingFunction = undefined;
            this.groupingMode = "";
        }
    }

    toggleSorting() {
        const listView = this.cardsListComponent.listView;
        if(!listView.sortingFunction) {
            listView.sortingFunction = SortingFunctionFactory.getSortingFunction();
            this.sortingMode = "Name ASC";
        } else {
            listView.sortingFunction = undefined;
            this.sortingMode = "";
        }
    }

    toggleFiltering() {
        const listView = this.cardsListComponent.listView;
        if(!listView.filteringFunction) {
            listView.filteringFunction = FilteringFunctionFactory.getFilteringFunction();
            this.filteringMode = "Has Image";
        } else {
            listView.filteringFunction = undefined;
            this.filteringMode = "";
        }
    }

    goBack(){
        this.routerExtension.back();
    }
}