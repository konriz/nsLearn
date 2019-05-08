import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { FiltersComponent } from "./search/filters.component";
import { CardsListComponent } from "./card/cardsList.component";
import { HeartstoneComponent } from "./heartstone.component";
import { HeartstoneService } from "./heartstone.service";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild([
            { path: "", redirectTo: "main", pathMatch: "full" },
            { path: "main", component: HeartstoneComponent },
            { path: "filters", component: FiltersComponent },
            { path: "list", component: CardsListComponent }
                
        ])
    ],
    declarations: [
        HeartstoneComponent,
        FiltersComponent,
        CardsListComponent
    ],
    providers: [HeartstoneService],
    schemas: [NO_ERRORS_SCHEMA]
})
export class HeartstoneModule {}