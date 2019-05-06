import { Component, ViewChild } from "@angular/core";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent {
    @ViewChild(RadSideDrawerComponent) sideDrawerComponent: RadSideDrawerComponent;

    constructor(private routerExtension: RouterExtensions) { }

    navigateToHome() {
        this.routerExtension.navigate(["/home"], {clearHistory: true});
        this.sideDrawerComponent.sideDrawer.closeDrawer();
    }

    navigateToEmailValidator() {
        this.routerExtension.navigate(["/email-validator"], {clearHistory: true});
        this.sideDrawerComponent.sideDrawer.closeDrawer();
    }

    navigateToCurrencyConverter() {
        this.routerExtension.navigate(["/currency"], {clearHistory: true});
        this.sideDrawerComponent.sideDrawer.closeDrawer();
    }

    navigateToHeartstone(){
        this.routerExtension.navigate(["/heartstone"], {clearHistory: true});
        this.sideDrawerComponent.sideDrawer.closeDrawer();
    }

 }
