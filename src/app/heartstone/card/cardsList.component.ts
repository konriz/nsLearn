import { Component, OnInit } from "@angular/core";
import { HeartstoneService } from "../heartstone.service";
import { Card } from "../heartstone.model";
import { RouterExtensions } from "nativescript-angular/router";

@Component(
    {
        selector: "ns-heartstone-cards-list",
        moduleId: module.id,
        templateUrl: "./cardsList.component.html",
        providers: []
    }
)
export class CardsListComponent implements OnInit {

    cards: Card[] = [];

    constructor(private service: HeartstoneService, private routerExtension: RouterExtensions) { }

    ngOnInit() {
        this.cards = this.service.fetchedList;
    }

    cardDetails(args){
        this.service.selectedCard = this.cards[args.index];
        this.routerExtension.navigate(["/heartstone/card"]);
    }

    goBack() {
        this.routerExtension.back();
    }
}