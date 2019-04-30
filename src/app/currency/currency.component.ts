import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { CurrencyService } from "./currency.service";
import * as appSettings from "tns-core-modules/application-settings";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "ns-currency",
    moduleId: module.id,
    providers: [CurrencyService],
    templateUrl: "./currency.component.html",
    styleUrls: ["./currency.component.css"],

})
export class CurrencyComponent implements OnInit{

    currencies: string[];
    amount: number;
    currencyFrom: number;
    currencyTo: number;
    converting: boolean = false;
    gettingCurrencies: boolean = false;
    output: string;

    constructor(private currencyService : CurrencyService, private location: Location, private routerExtension: RouterExtensions){
    }

    ngOnInit(){
        this.amount = 1;
        this.currencyFrom = 0;
        this.currencyTo = 0;
        this.converting = false;
        this.output = "";
        this.getCurrencies();
    }

    goBack(){
        this.routerExtension.navigate(["/home"], {clearHistory: true});
    }

    convert(){
        this.output = "";
        this.converting = true;

        this.currencyService.getExchangeRate(this.getCurrencyShort(this.currencyFrom), this.getCurrencyShort(this.currencyTo)).subscribe(
            (exchangeRate) => {
                let result = (this.amount * +exchangeRate).toFixed(2);
                this.converting = false;
                this.output = this.getConversionString(result);
            },
            (error) => {
                alert(error);
                this.converting = false;
                this.output = "0";
            }
        );
    }

    private getConversionString(result: string){
        let output = this.amount + " " + this.getCurrencyShort(this.currencyFrom) + " = " + result + " " + this.getCurrencyShort(this.currencyTo);
        return output;
    }

    private getCurrencyShort(index: number){
        return this.currencies[index];
    }

    private getCurrencies(){
        this.gettingCurrencies = true;
        if(appSettings.getString("quotesString")){
            this.setCurrencies(appSettings.getString("quotesString"));
        } else {
            this.currencyService.getQuotes().subscribe(
                (quotes) => this.setCurrencies(quotes),
                (error) => {
                    alert(error);
                    this.setCurrencies("");
                }
            );
        }
    }

    private setCurrencies(currenciesString: string){
        this.gettingCurrencies = false;
        appSettings.setString("quotesString", currenciesString);
        this.currencies = this.splitQuotes(currenciesString);
    }

    private splitQuotes(quotesString: string){
        return quotesString.replace(/[ "[\]]/g, "").split(",");
    }
}