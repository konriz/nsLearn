import { Component, OnInit } from "@angular/core";
import { HeartstoneService } from "../heartstone.service";
import { RouterExtensions } from "nativescript-angular/router";

@Component(
    {
        selector: "ns-heartstone-cards-list",
        moduleId: module.id,
        templateUrl: "./cardsList.component.html",
        providers: []
    }
)
export class CardsListComponent {

    constructor(private service: HeartstoneService, private routerExtension: RouterExtensions) { }


    cardDetails(args){
        this.service.selectCard(args.index);
        this.routerExtension.navigate(["/heartstone/card"]);
    }

    goBack() {
        this.routerExtension.back();
    }
}