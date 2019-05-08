import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { HeartstoneService } from "../heartstone.service";
import { Info, Card } from "../heartstone.model";
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

    constructor(private routerExtension: RouterExtensions, private activeRoute: ActivatedRoute, private service: HeartstoneService){

    }

    ngOnInit() {
        this.service.getInfo().subscribe(
            res => {
                this.info = new Info(res.json());
            }
        );
    }

    goBack() {
        this.routerExtension.back();
    }

    raceDetails(args) { 
        this.service.getByFilter(HeartstoneFilter.Race, this.info.races[args.index]).subscribe(
            res => {
                this.showList(res);
            }
        );
    }

    classDetails(args) { 
        this.service.getByFilter(HeartstoneFilter.Class, this.info.classes[args.index]).subscribe(
            res => {
                this.showList(res);
            }
        );
    }

    factionDetails(args) { 
        this.service.getByFilter(HeartstoneFilter.Faction, this.info.factions[args.index]).subscribe(
            res => {
                this.showList(res);
            }
        );
    }

    showList(cardsList: Card[]){
        this.routerExtension.navigate(["/heartstone/list"]);
    }
}