import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { HeartstoneModel } from "../heartstone.model";
import { ListViewEventData } from "nativescript-ui-listview";

@Component(
    {
        selector: "ns-heartstone-browse",
        moduleId: module.id,
        templateUrl: "./browse.component.html",
        styleUrls: ["./browse.component.css"]
    }
)
export class BrowseComponent {

    constructor(private model: HeartstoneModel, private routerExtension: RouterExtensions) {
    }

    cardDetails(args: ListViewEventData){
        this.model.selectCard(args.index);
        this.routerExtension.navigate(["/heartstone/card"]);
    }

    goBack(){
        this.routerExtension.back();
    }
}