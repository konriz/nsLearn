import { Component, OnInit } from "@angular/core";
import { HeartstoneService } from "../heartstone.service";
import { Card } from "../heartstone.model";
import { RouterExtensions } from "nativescript-angular/router";

@Component(
    {
        selector: "ns-heartstone-card",
        moduleId: module.id,
        templateUrl: "./card.component.html",
        styleUrls: ["./card.component.css"]
    }
)
export class CardComponent{

    constructor(private service: HeartstoneService, private routerExtension: RouterExtensions) { }

    goBack() {
        this.routerExtension.back();
    }
}