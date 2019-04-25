import { Component, OnInit } from "@angular/core";
import { CurrencyExchangeData } from "./currency.model";
import { CurrencyService } from "./currency.service";

@Component({
    selector: "ns-currency",
    moduleId: module.id,
    providers: [CurrencyService],
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

    constructor(private currencyService : CurrencyService){
    }

    ngOnInit(){
        this.amount = 0;
        this.selectedCurrencyFrom = 0;
        this.selectedCurrencyTo = 0;
        this.conversion = "";
        this.result = "";
        this.currencies = new Array();
        
        this.currencyService.getQuotes().subscribe(
            (quotes) => {
                this.currencies = quotes;
            },
            (error) => alert(error)
        );
    }

    convert(){
        this.currencyData = new CurrencyExchangeData(this.amount, this.currencies[this.selectedCurrencyFrom], this.currencies[this.selectedCurrencyTo]);
        this.conversion = this.currencyData.toString();
        
        this.currencyService.getExchangeRate(this.currencyData.currencyFrom, this.currencyData.currencyTo).subscribe(
            (exchangeRate) => {
                this.result = exchangeRate;
            },
            (error) => alert(error)
        );

        
    }
}