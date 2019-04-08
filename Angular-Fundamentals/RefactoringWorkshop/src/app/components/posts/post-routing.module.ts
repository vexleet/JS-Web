import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostCreateComponent } from "./post-create/post-create.component";
import { PostEditComponent } from "./post-edit/post-edit.component";
import { FetchPostResolver } from "src/app/core/resolvers/fetch-post.resolver";
import { PostDetailsComponent } from "./post-details/post-details.component";
import { PostListComponent } from './post-list/post-list.component';

const postRoutes: Routes = [
    { path: '', pathMatch: 'full', component: PostListComponent, },
    { path: 'create', component: PostCreateComponent },
    { path: 'user', component: PostListComponent },
    { path: 'edit/:id', component: PostEditComponent, resolve: { post: FetchPostResolver } },
    { path: 'details/:id', component: PostDetailsComponent, resolve: { post: FetchPostResolver } }
];
@NgModule({
    imports: [
        RouterModule.forChild(postRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class PostRoutingModule { }
