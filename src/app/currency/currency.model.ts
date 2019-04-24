export class CurrencyExchangeData {
    public amount: number;
    public currencyFrom: string;
    public currencyTo: string;

    constructor(amount: number, currencyFrom: string, currencyTo: string) {
        this.amount = amount;
        this.currencyFrom = currencyFrom;
        this.currencyTo = currencyTo;
    }

    toString(){
        return "Converting " + this.amount + " " + this.currencyFrom + " to " + this.currencyTo + ".";
    }
}