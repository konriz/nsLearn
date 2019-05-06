import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { HeartstoneComponent } from "./heartstone.component";
import { HeartstoneRacesComponent } from "./races/heartstone-races.component";
import { HeartstoneClassesComponent } from "./classes/heartstone-classes.component";
import { HeartstoneFactionsComponent } from "./factions/heartstone-factions.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild([
            {
                path: "", component: HeartstoneComponent, children: [
                    {
                        path: "races",
                        outlet: "racesTab",
                        component: HeartstoneRacesComponent
                    },
                    {
                        path: "classes",
                        outlet: "classesTab",
                        component: HeartstoneClassesComponent
                    },
                    {
                        path: "factions",
                        outlet: "factionsTab",
                        component: HeartstoneFactionsComponent
                    }
                ]
        }
        ])
    ],
    declarations: [
        HeartstoneComponent,
        HeartstoneRacesComponent,
        HeartstoneClassesComponent,
        HeartstoneFactionsComponent
    ],
    providers: [],
    schemas: [NO_ERRORS_SCHEMA]
})
export class HeartstoneModule {}