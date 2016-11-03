/**
 * Created by Timo on 11.10.2016.
 */
import { Component } from '@angular/core';
import {Router, NavigationStart, NavigationEnd, Event} from "@angular/router";
@Component({
    selector: 'my-app',
    templateUrl: 'app/templates/app.html'
})
export class AppComponent {
    isLoading:boolean = true;

    constructor(public router:Router) {}

    ngOnInit() {
        this.router.events.subscribe((event: Event): void => {
            if (event instanceof NavigationStart) {
                console.log('Navigation START!');
                this.isLoading = true;
            }
            if (event instanceof NavigationEnd) {
                console.log('Navigation END!');
                this.isLoading = false;
            }
        });
    }
}