/**
 * Created by Timo on 12.10.2016.
 */
import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class StandingsService {
    constructor(private http: Http) {
    }

    getMatchday(): Observable<Response> {
        return this.http.get('/api/standings')
            .map((res: Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getLive(): Observable<Response> {
        return this.http.get('/api/standings/live')
            .map(res => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getTest(): Observable<Response> {
        return this.http.get('/api/standings/test')
            .map(res => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

//     private handleError (error: Response | any) {
//         console.error('Error im Service', error);
//         let errMsg: string;
//         if (error instanceof Response) {
//             const body = error.json() || '';
//             const err = body.error || JSON.stringify(body);
//             errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
//         } else {
//             errMsg = error.message ? error.message : error.toString();
//         }
//
//         console.error('Error im Service', errMsg);
//         return Observable.throw(errMsg);
//     }
}