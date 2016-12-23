import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { PostsComponent }   from './posts.component';
import { PostService } from './post.service';

@NgModule({
    imports: [ 
        CommonModule, 
        SharedModule 
    ],
    exports: [ PostsComponent ],
    declarations: [ PostsComponent ],
    providers: [ PostService ]
})
export class PostsModule { }
