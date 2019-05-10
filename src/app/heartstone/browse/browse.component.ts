import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { HeartstoneModel } from "../heartstone.model";

@Component(
    {
        selector: "ns-heartstone-browse",
        moduleId: module.id,
        templateUrl: "./browse.component.html",
        providers: []
    }
)
export class BrowseComponent {

    constructor(private model: HeartstoneModel, private routerExtension: RouterExtensions) {
    }

    cardDetails(args){
        this.model.selectCard(args.index);
        this.routerExtension.navigate(["/heartstone/card"]);
    }

    goBack(){
        this.routerExtension.back();
    }
}