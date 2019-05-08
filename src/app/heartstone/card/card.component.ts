import { Component, OnInit } from "@angular/core";
import { HeartstoneService } from "../heartstone.service";
import { Card } from "../heartstone.model";
import { RouterExtensions } from "nativescript-angular/router";

@Component(
    {
        selector: "ns-heartstone-card",
        moduleId: module.id,
        templateUrl: "./card.component.html"
    }
)
export class CardComponent implements OnInit{

    card: Card;

    constructor(private service: HeartstoneService, private routerExtension: RouterExtensions) { }

    ngOnInit() {
        this.card = this.service.selectedCard;
    }

    goBack() {
        this.routerExtension.back();
    }
}