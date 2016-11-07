import {Component, Input} from "@angular/core";
/**
 * Created by Timo on 25.10.2016.
 */

@Component({
    selector: 'gamecard',
    templateUrl: 'app/templates/gamecard.html',
    styleUrls: ['app/styles/gamecard.css']
})
export class GamecardComponent {
    @Input() standing: {};
    @Input() guestTeamColor: string;
    @Input() homeTeamColor: string;
    @Input() guestTeamBadgeHref: string;
    @Input() homeTeamBadgeHref: string;

    toTitleCase(str: string) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    getFormattedQuarter(): string {
        if (isNaN(this.standing['game']['quarter'])) {
            switch (this.standing['game']['quarter'].toLocaleLowerCase()) {
                case 'pregame':
                    return '@';
                case 'halftime':
                    return 'HT';
                case 'final overtime':
                    return 'Final OT'
                case 'final':
                    return 'Final';
            }
            return this.toTitleCase(this.standing['game']['quarter']);
        } else {
            switch (parseInt(this.standing['game']['quarter'])) {
                case 1:
                    return '1st';
                case 2:
                    return '2nd';
                case 3:
                    return '3rd';
                case 4:
                    return '4th';
                case 5:
                    return 'OT'
            }
            return '0';
        }
    }

    setBackground() {
        let styles = {
            'background-image': 'url(' + this.guestTeamBadgeHref + '), ' +
                                'url(' + this.homeTeamBadgeHref + '), ' +
                                'linear-gradient(-65deg, ' + this.homeTeamColor + ' 0%, ' + this.homeTeamColor + ' 50%, ' + this.guestTeamColor + ' 50%, ' + this.guestTeamColor + ' 100%)'
        };

        return styles;
    }
}