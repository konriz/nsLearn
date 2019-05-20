import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { HeartstoneModel } from "./heartstone.model";

@Component(
    {
        selector: "ns-heartstone",
        moduleId: module.id,
        templateUrl: "./heartstone.component.html"
    }
)
export class HeartstoneComponent implements OnInit {

    constructor(private routerExtension: RouterExtensions, private activeRoute: ActivatedRoute, private model: HeartstoneModel) { }

    ngOnInit() {
        this.model.init().then(log => console.log(log));
    }

    goToBrowse(){
        this.routerExtension.navigate(["/heartstone/browse"]);
    }

    goBack(){
        this.routerExtension.navigate(["/home"], {clearHistory: true});
    }
}