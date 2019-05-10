import { Component } from "@angular/core";
import { HeartstoneModel } from "../heartstone.model";
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

    constructor(private model: HeartstoneModel, private routerExtension: RouterExtensions) { }

    cardDetails(args){
        this.model.selectCard(args.index);
        this.routerExtension.navigate(["/heartstone/card"]);
    }

    goBack() {
        this.routerExtension.back();
    }
}