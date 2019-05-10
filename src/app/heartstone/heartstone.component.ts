import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";

@Component(
    {
        selector: "ns-heartstone",
        moduleId: module.id,
        templateUrl: "./heartstone.component.html"
    }
)
export class HeartstoneComponent {

    constructor(private routerExtension: RouterExtensions, private activeRoute: ActivatedRoute) { }

    goToBrowse(){
        this.routerExtension.navigate(["/heartstone/browse"]);
    }

    goToFilters(){
        this.routerExtension.navigate(["/heartstone/filters"]);
    }

    goBack(){
        this.routerExtension.navigate(["/home"], {clearHistory: true});
    }
}