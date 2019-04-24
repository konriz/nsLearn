import { Component, OnInit } from "@angular/core";
import { CurrencyExchangeData } from "./currency.model";

@Component({
    selector: "ns-currency",
    moduleId: module.id,
    templateUrl: "./currency.component.html",
    styleUrls: ["./currency.component.css"],

})
export class CurrencyComponent implements OnInit{

    currencyData: CurrencyExchangeData;
    currencies: string[];
    amount: number;
    selectedCurrencyFrom: number;
    selectedCurrencyTo: number;
    conversion: string;
    result: string;

    constructor(){
    }

    ngOnInit(){
        this.amount = 0;
        this.selectedCurrencyFrom = 0;
        this.selectedCurrencyTo = 0;
        this.conversion = "";
        this.result = "";
        this.currencies = new Array();
        this.currencies[0] = "One";
        this.currencies[1] = "Two";
        this.currencies[2] = "Three";
    }

    convert(){
        this.currencyData = new CurrencyExchangeData(this.amount, this.currencies[this.selectedCurrencyFrom], this.currencies[this.selectedCurrencyTo]);
        this.conversion = this.currencyData.toString();
        this.result = this.currencyData.amount.toString();
    }
}