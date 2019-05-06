import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { EmailValidatorComponent } from "./email-validator/email-validator.component";
import { CurrencyComponent } from "./currency/currency.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "email-validator", component: EmailValidatorComponent },
    { path: "currency", component: CurrencyComponent },
    { path: "heartstone", loadChildren: "~/app/heartstone/heartstone.module#HeartstoneModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
