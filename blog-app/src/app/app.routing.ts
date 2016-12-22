import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { NotFoundComponent } from './shared/not-found.component';

export const appRouting = RouterModule.forRoot([
    { path: 'notfound', component: NotFoundComponent },
    { path: '', component: HomeComponent },
    { path: '**', redirectTo: '/' }
]);
