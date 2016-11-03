/**
 * Created by Timo on 27.10.2016.
 */

import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {StandingsService} from "../services/standings.service";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import {TeamcolorsService} from "../services/teamcolors.service";

@Injectable()
export class TeamcolorsResolver implements Resolve<any> {

    constructor(private configService: TeamcolorsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|boolean {
        return this.configService.getTeamcolors()
            .catch(
                err => {
                    console.log('Error while loading teamcolors', err);
                    return err;
                }
            );
    }
}