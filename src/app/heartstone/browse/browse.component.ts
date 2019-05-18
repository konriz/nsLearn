import { Component, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { HeartstoneModel } from "../heartstone.model";
import { ListViewEventData } from "nativescript-ui-listview";
import { RadListViewComponent } from "nativescript-ui-listview/angular/listview-directives";
import { SortingFunctionFactory } from "./functionsFactory/sorting-func-factory";
import { FilteringFunctionFactory } from "./functionsFactory/filtering-func-factory";
import { GroupingFunctionFactory } from "./functionsFactory/grouping-func.factory";
import { Group } from "./functionsFactory/groups.enum";
import { Sort } from "./functionsFactory/sort.enum";
import { Filter } from "./functionsFactory/filters.enum";

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
            console.log("Grouping...")
            listView.groupingFunction = GroupingFunctionFactory.getGroupingFunction(Group.ByType);
            this.groupingMode = Group.ByType;
        } else {
            console.log("Ungrouping...")
            listView.groupingFunction = undefined;
            this.groupingMode = "";
        }
    }

    toggleSorting() {
        const listView = this.cardsListComponent.listView;
        if(!listView.sortingFunction) {
            console.log("Sorting...");
            listView.sortingFunction = SortingFunctionFactory.getSortingFunction(Sort.ByName);
            this.sortingMode = Sort.ByName;
        } else {
            console.log("Unsorting...");
            listView.sortingFunction = undefined;
            this.sortingMode = "";
        }
    }

    toggleFiltering() {
        const listView = this.cardsListComponent.listView;
        if(!listView.filteringFunction) {
            console.log("Filtering...");
            listView.filteringFunction = FilteringFunctionFactory.getFilteringFunction(Filter.ByType, "Minion");
            this.filteringMode = Filter.ByType + "= Minion";
        } else {
            console.log("Unfiltering...");
            listView.filteringFunction = undefined;
            this.filteringMode = "";
        }
    }

    goBack(){
        this.routerExtension.back();
    }
}