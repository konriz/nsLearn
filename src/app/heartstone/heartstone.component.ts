import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";

@Component(
    {
        selector: "ns-heartstone",
        moduleId: module.id,
        templateUrl: "./heartstone.component.html"
    }
)
export class HeartstoneComponent implements OnInit{

    constructor(private routerExtension: RouterExtensions, private activeRoute: ActivatedRoute){

    }

    ngOnInit() {

    }

    goBack(){
        this.routerExtension.navigate(["/home"], {clearHistory: true});
    }
}