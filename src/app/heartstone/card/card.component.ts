import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { HeartstoneModel } from "../heartstone.model";

@Component(
    {
        selector: "ns-heartstone-card",
        moduleId: module.id,
        templateUrl: "./card.component.html",
        styleUrls: ["./card.component.css"]
    }
)
export class CardComponent{

    constructor(private model: HeartstoneModel, private routerExtension: RouterExtensions) { }

    zoom() {
        this.routerExtension.navigate(["/heartstone/zoom"]);
    }

    goBack() {
        this.routerExtension.back();
    }
}