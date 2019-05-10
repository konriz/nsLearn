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
export class ZoomComponent{

    constructor(private model: HeartstoneModel, private routerExtension: RouterExtensions) { }

    goBack() {
        this.routerExtension.back();
    }
}