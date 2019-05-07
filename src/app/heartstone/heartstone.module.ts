import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { HeartstoneComponent } from "./heartstone.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild([
            {
                path: "", component: HeartstoneComponent
        }
        ])
    ],
    declarations: [
        HeartstoneComponent
    ],
    providers: [],
    schemas: [NO_ERRORS_SCHEMA]
})
export class HeartstoneModule {}