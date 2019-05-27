import { Component, ViewChild, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { HeartstoneModel } from "../heartstone.model";
import { ListViewEventData } from "nativescript-ui-listview";
import { RadListViewComponent } from "nativescript-ui-listview/angular/listview-directives";
import { SortingFunctionFactory, Order, Sort } from "./functionsFactory/sorting-func-factory";
import { FilteringFunctionFactory, Filter } from "./functionsFactory/filtering-func-factory";
import { GroupingFunctionFactory, Group } from "./functionsFactory/grouping-func-factory";
import { Card } from "../heartstone.dto";

@Component(
    {
        selector: "ns-heartstone-browse",
        moduleId: module.id,
        templateUrl: "./browse.component.html",
        styleUrls: ["./browse.component.css"]
    }
)
export class BrowseComponent implements OnInit {

    private groupingText = "Group by: ";
    private groupingMode = "";
    private sortingText = "Sort by: ";
    private sortingMode = "";
    private filteringText = "Filter by: ";
    private filteringMode = "";

    private cards: Card[];
    private loading: boolean;

    @ViewChild("cardsList") cardsListComponent: RadListViewComponent;

    constructor(private model: HeartstoneModel, private routerExtension: RouterExtensions) {
    }

    ngOnInit() {
        this.loadCards();
    }

    onPullToRefresh(args: ListViewEventData) {
        this.loadCards();
        args.object.notifyPullToRefreshFinished();
    }

    private loadCards() {
        this.loading = true;
        this.model.loadCards().then(
            cards => {
                this.cards = cards;
                this.loading = false;
            }
        );
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
            this.groupingMode = GroupingFunctionFactory.getGroupingString(Group.ByType);
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
            listView.sortingFunction = SortingFunctionFactory.getSortingFunction(Sort.ByName, Order.Ascending);
            this.sortingMode = SortingFunctionFactory.getSortingString(Sort.ByName, Order.Ascending);
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
            this.filteringMode = FilteringFunctionFactory.getFilteringString(Filter.ByType, "Minion");
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