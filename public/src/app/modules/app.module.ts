import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent }   from '../components/app.component';
import {NavbarComponent} from "../components/navbar.component";
import {RouterModule} from "@angular/router";
import {StandingsRoutes} from "../routes/standings.routes";
import {MatchdayComponent} from "../components/matchday.component";
import {GamecardComponent} from "../components/gamecard.component";
import {StandingsResolver} from "../resolver/standings.resolver";
import {StandingsService} from "../services/standings.service";
import {TeamcolorsResolver} from "../resolver/teamcolors.resolver";
import {TeamcolorsService} from "../services/teamcolors.service";

@NgModule({
    imports:      [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(StandingsRoutes)
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        MatchdayComponent,
        GamecardComponent
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        StandingsResolver,
        StandingsService,
        TeamcolorsResolver,
        TeamcolorsService
    ]
})
export class AppModule { }