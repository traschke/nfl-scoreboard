/**
 * Created by Timo on 11.10.2016.
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './modules/app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);