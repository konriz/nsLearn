import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { FiltersComponent } from "./search/filters.component";
import { CardsListComponent } from "./card/cardsList.component";
import { HeartstoneComponent } from "./heartstone.component";
import { CardComponent } from "./card/card.component";
import { BrowseComponent } from "./browse/browse.component";
import { HeartstoneModel } from "./heartstone.model";
import { HeartstoneService } from "./heartstone.service";
import { ZoomComponent } from "./card/zoom.component";
import { HeartstoneDatabaseService } from "./database.service";
import { HeartstoneDao } from "./heartstone.dao";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild([
            { path: "", redirectTo: "main", pathMatch: "full" },
            { path: "main", component: HeartstoneComponent },
            { path: "browse", component: BrowseComponent },
            { path: "filters", component: FiltersComponent },
            { path: "list", component: CardsListComponent },
            { path: "card", component: CardComponent },
            { path: "zoom", component: ZoomComponent }
        ])
    ],
    declarations: [
        HeartstoneComponent,
        FiltersComponent,
        BrowseComponent,
        CardsListComponent,
        CardComponent,
        ZoomComponent
    ],
    providers: [HeartstoneModel, HeartstoneService, HeartstoneDatabaseService, HeartstoneDao],
    schemas: [NO_ERRORS_SCHEMA]
})
export class HeartstoneModule {}