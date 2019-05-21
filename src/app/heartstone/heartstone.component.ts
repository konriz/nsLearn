import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

@Component(
    {
        selector: "ns-heartstone",
        moduleId: module.id,
        templateUrl: "./heartstone.component.html"
    }
)
export class HeartstoneComponent{

    constructor(private routerExtension: RouterExtensions) { }

    goToBrowse(){
        this.routerExtension.navigate(["/heartstone/browse"]);
    }

    goBack(){
        this.routerExtension.navigate(["/home"], {clearHistory: true});
    }
}