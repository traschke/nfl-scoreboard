import {MatchdayComponent} from "../components/matchday.component";
import {StandingsResolver} from "../resolver/standings.resolver";
import {TeamcolorsResolver} from "../resolver/teamcolors.resolver";
/**
 * Created by Timo on 20.10.2016.
 */

export const StandingsRoutes = [
    {
        path: '',
        component: MatchdayComponent,
        resolve: {
            standings: StandingsResolver,
            colors: TeamcolorsResolver
        }
    },
    {
        path: 'live',
        component: MatchdayComponent,
        resolve: {
            standings: StandingsResolver,
            colors: TeamcolorsResolver
        }
    },
    {
        path: 'test',
        component: MatchdayComponent,
        resolve: {
            standings: StandingsResolver,
            colors: TeamcolorsResolver
        }
    },
    {
        path: '**',
        redirectTo: ''
    }
];