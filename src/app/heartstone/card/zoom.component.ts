import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { HeartstoneModel } from "../heartstone.model";

@Component(
    {
        selector: "ns-heartstone-zoom",
        moduleId: module.id,
        templateUrl: "./zoom.component.html"
    }
)
export class ZoomComponent{

    constructor(private model: HeartstoneModel, private routerExtension: RouterExtensions) { }

    goBack() {
        this.routerExtension.back();
    }
}