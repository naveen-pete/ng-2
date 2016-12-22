import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerComponent } from './spinner.component';
import { PaginationComponent } from './pagination.component';
import { NotFoundComponent } from './not-found.component';

@NgModule({
    imports: [ CommonModule ],
    exports: [ SpinnerComponent, PaginationComponent, NotFoundComponent ],
    declarations: [ SpinnerComponent, PaginationComponent, NotFoundComponent ]
})
export class SharedModule { }
