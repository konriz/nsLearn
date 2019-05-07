import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { HeartstoneService } from "./heartstone.service";
import { Info, Card } from "./heartstone.model";
import { HeartstoneFilter } from "./heartstone.filter";

@Component(
    {
        selector: "ns-heartstone",
        moduleId: module.id,
        templateUrl: "./heartstone.component.html",
        providers: [HeartstoneService]
    }
)
export class HeartstoneComponent implements OnInit{

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
        let output = "";
        output += (cardsList.length + " cards found\n");
        cardsList.forEach(card => output += (card.name + "\n"));
        alert(output);
    }

    goBack(){
        this.routerExtension.navigate(["/home"], {clearHistory: true});
    }
}