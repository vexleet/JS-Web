import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PostService } from '../../../core/services/post.service';
import { CommentService } from '../../../core/services/comment.service';
import { zip } from 'rxjs';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  post: Object;
  comments: Object[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private commentService: CommentService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    zip(this.postService.getDetails(id), this.commentService.getAllForPost(id))
      .subscribe(([post, comments]) => {
        this.post = post;
        this.comments = comments;
      });

    this.postService.getDetails(id)
      .subscribe((data) => {
        this.post = data;
      });
  }

  postComment(commentFormValue) {
    const body = commentFormValue;

    body['postId'] = this.post['_id'];
    body['author'] = localStorage.getItem('username');

    this.commentService
      .postComment(commentFormValue)
      .subscribe(() => {
        this.loadComments();
      })
  }

  loadComments() {
    this.commentService.getAllForPost(this.post['_id'])
      .subscribe((data) => {
        this.comments = data;
      });
  }

  deleteComment(id: string) {
    this.commentService.deleteComment(id)
      .subscribe(() => {
        this.loadComments();
      });
  }

  isAuthor() {
    return this.post['_acl']['creator'] === localStorage.getItem('userId');
  }

  deletePost(id: string) {
    this.postService.deletePost(id)
      .subscribe(() => {
        this.router.navigate(['/posts']);
      })
  }
}
