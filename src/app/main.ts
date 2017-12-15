import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/pluck';
import { AppModule } from './app.module';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromPromise';

platformBrowserDynamic().bootstrapModule(AppModule);
