import {Component, Input} from "@angular/core";
/**
 * Created by Timo on 20.10.2016.
 */

@Component({
    selector: 'navbar',
    templateUrl: 'app/templates/navbar.html',
    styleUrls: ['./app/styles/navbar.min.css']
})
export class NavbarComponent {

    @Input() isLoading: boolean;

    fullscreen() {
        if (!document.fullscreenElement &&    // alternative standard method
            !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen((<any>Element).ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }
}