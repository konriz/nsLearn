import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

import { EmailValidatorService } from "./email-validator.service";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "ns-email-validator",
    providers: [EmailValidatorService],
    moduleId: module.id,
    templateUrl: "./email-validator.component.html",
    styleUrls: ["./email-validator.component.css"]
})
export class EmailValidatorComponent implements OnInit {
    email: string;
    response: string

    constructor(private emailValidatorService : EmailValidatorService, private location : Location, private routerExtension: RouterExtensions) { }

    ngOnInit() {
        this.email = "";
        this.response = "Waiting for email to validate"
    }

    goBack(){
        this.routerExtension.navigate(["/home"], {clearHistory: true});
    }

    validate(){
        this.emailValidatorService.validate(this.email).subscribe(
            res => res ? this.response = this.email + " is valid." : this.response = this.email + " is invalid!",
            err => this.response = err
        );
    }
}