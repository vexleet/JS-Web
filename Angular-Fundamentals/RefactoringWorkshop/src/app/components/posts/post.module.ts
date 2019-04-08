import { CommentsModule } from './../comments/comments.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './../../app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostInfoComponent } from './post-info/post-info.component';
import { PostRoutingModule } from './post-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // AppRoutingModule,
        CommentsModule,
        PostRoutingModule,
    ],
    declarations: [
        PostListComponent,
        PostCreateComponent,
        PostEditComponent,
        PostDetailsComponent,
        PostInfoComponent,
    ],
    exports: [
        PostListComponent,
        PostCreateComponent,
        PostEditComponent,
        PostDetailsComponent,
        PostInfoComponent,
    ]
})
export class PostModule { }
