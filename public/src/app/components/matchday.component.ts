/**
 * Created by Timo on 25.10.2016.
 */

import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {StandingsResolver} from "../resolver/standings.resolver";
import {TeamcolorsResolver} from "../resolver/teamcolors.resolver";
import {StandingsService} from "../services/standings.service";

@Component({
    selector: 'matchday',
    templateUrl: 'app/templates/matchday.html',
    providers: [StandingsService, StandingsResolver, TeamcolorsResolver]
})
export class MatchdayComponent {
    standings: [{}];
    colors: {};
    timer;

    constructor (
        private route: ActivatedRoute,
        private router: Router,
        private standingsService: StandingsService
    ) {}

    ngOnInit() {
        console.log(this.route.data);
        this.route.data.forEach((data: {standings: {}}) => {
            this.standings = data.standings['standings'];
        });
        this.route.data.forEach((data: {colors: {}}) => {
            this.colors = data.colors;
        });
        this.startPolling(30000);
    }

    ngOnDestroy() {
        this.stopPolling();
    }

    startPolling(interval: number) {
        var poll = () => {
            switch (this.router.url) {
                case '/':
                    this.getMatchday();
                    break;
                case '/live':
                    this.getLive();
                    break;
                case '/test':
                    this.getTest();
                    break;
            }
            this.timer = setTimeout(() => {
                poll();
            }, interval);
        };
        this.timer = setTimeout(() => {
            poll();
        }, interval);
    }

    stopPolling() {
        clearTimeout(this.timer);
    }

    getGuestTeamBadgeHref(teamName: string) {
        return 'images/badges/guest/' + teamName.toLowerCase() + '.svg';
    }

    getHomeTeamBadgeHref(teamName: string) {
        return 'images/badges/home/' + teamName.toLowerCase() + '.svg';
    }

    getTest() {
        console.log('Get Test Standings');
        this.standingsService.getTest()
            .subscribe(
                data => {
                    this.standings = data['standings'];
                },
                error => {
                    console.error(error);
                },
                () => {
                    console.log('Test Standings OK!');
                }
            )
    }

    getMatchday() {
        console.log('Get Matchday Standings');
        this.standingsService.getMatchday()
            .subscribe(
                data => {
                    this.standings = data['standings'];
                },
                error => {
                    console.error(error);
                },
                () => {
                    console.log('Matchday OK!');
                }
            )
    }

    getLive() {
        console.log('Get Live Standings');
        this.standingsService.getLive()
            .subscribe(
                data => {
                    this.standings = data['standings'];
                },
                error => {
                    console.error(error);
                },
                () => {
                    console.log('Live OK!');
                }
            )
    }
}