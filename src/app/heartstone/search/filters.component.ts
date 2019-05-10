import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { HeartstoneModel } from "../heartstone.model";
import { Info, Card } from "../heartstone.dto";
import { HeartstoneFilter } from "./filters.enum";

@Component(
    {
        selector: "ns-heartstone-filters",
        moduleId: module.id,
        templateUrl: "./filters.component.html",
        providers: []
    }
)
export class FiltersComponent implements OnInit{

    info: Info;

    constructor(private routerExtension: RouterExtensions, private activeRoute: ActivatedRoute, private model: HeartstoneModel){

    }

    ngOnInit() {
        this.model.getInfo().subscribe(
            res => {
                this.info = new Info(res.json());
            },
            err => {
                console.log(err);
            }
        );
    }

    goBack() {
        this.routerExtension.back();
    }

    raceDetails(args) { 
        this.model.getByFilter(HeartstoneFilter.Race, this.info.races[args.index]).subscribe(
            res => {
                this.showList(res);
            }
        );
    }

    classDetails(args) { 
        this.model.getByFilter(HeartstoneFilter.Class, this.info.classes[args.index]).subscribe(
            res => {
                this.showList(res);
            }
        );
    }

    factionDetails(args) { 
        this.model.getByFilter(HeartstoneFilter.Faction, this.info.factions[args.index]).subscribe(
            res => {
                this.showList(res);
            }
        );
    }

    showList(cardsList: Card[]){
        this.routerExtension.navigate(["/heartstone/list"]);
    }
}