import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentCreateComponent } from './comment-create/comment-create.component';
import { CommentInfoComponent } from './comment-info/comment-info.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        CommentCreateComponent,
        CommentInfoComponent,
    ],
    exports: [
        CommentCreateComponent,
        CommentInfoComponent,
    ]
})
export class CommentsModule { }
