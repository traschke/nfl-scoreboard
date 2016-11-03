/**
 * Created by Timo on 12.10.2016.
 */
import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TeamcolorsService {
    constructor(private _http: Http) {
    }

    getTeamcolors() {
        return this._http.get('/app/config/teamcolors.json')
            .map(res => res.json())
            .catch((error:any) => Observable.throw('Server error'));
    }
}