/**
 * Created by Timo on 27.10.2016.
 */

import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {StandingsService} from "../services/standings.service";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class StandingsResolver implements Resolve<any> {

    constructor(private standingsService: StandingsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|boolean {
        var url = state.url;
        console.log('Route url:', url);

        switch (url) {
            case '/':
                return this.standingsService.getMatchday()
                    // .map(
                    //     data => {
                    //         console.log('DATA IN RESOLVER', data);
                    //         return data;
                    //     }
                    // )
                    .catch(
                        err => {
                            console.log('ERROR TYPE:', typeof err);
                            console.error('Error in resolver', err);
                            return err;
                        }
                    );

            case '/live':
                return this.standingsService.getLive()
                    // .map(
                    //     data => {
                    //         console.log('DATA IN RESOLVER', data);
                    //         return data;
                    //     }
                    // )
                    .catch(
                        err => {
                            console.error('Error in resolver', err);
                            return err;
                        }
                    );
            case '/test':
                return this.standingsService.getTest()
                    // .map(
                    //     data => {
                    //         console.log('DATA IN RESOLVER', data);
                    //         return data;
                    //     }
                    // )
                    .catch(
                        err => {
                            console.error('Error in resolver', err);
                            return err;
                        }
                    );
            default:
                return false;
        }

    }
}