import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { EmailValidatorComponent } from "./email-validator/email-validator.component";
import { CurrencyComponent } from "./currency/currency.component";
import { HeartstoneComponent } from "./heartstone/heartstone.component";
import { HeartstoneRacesComponent } from "./heartstone/races/heartstone-races.component";
import { HeartstoneClassesComponent } from "./heartstone/classes/heartstone-classes.component";
import { HeartstoneFactionsComponent } from "./heartstone/factions/heartstone-factions.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        EmailValidatorComponent,
        CurrencyComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
