import { HeartstoneService } from "../heartstone.service";
import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

@Component(
    {
        selector: "ns-heartstone-browse",
        moduleId: module.id,
        templateUrl: "./browse.component.html",
        providers: [HeartstoneService]
    }
)
export class BrowseComponent {

    constructor(private service: HeartstoneService, private routerExtension: RouterExtensions) {

    }

    goBack(){
        this.routerExtension.back();
    }
}