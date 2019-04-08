import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../core/services/post.service';
import { IPostInfo } from 'src/app/core/models';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  @ViewChild('f') editPostForm: NgForm;
  post: IPostInfo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.post = this.route.snapshot.data['post'];
  }

  editPost() {
    const body = this.editPostForm.value;
    body['author'] = localStorage.getItem('username');

    this.postService.editPost(body, this.post['_id'])
      .subscribe(() => {
        this.router.navigate(['/posts']);
      });
  }
}
