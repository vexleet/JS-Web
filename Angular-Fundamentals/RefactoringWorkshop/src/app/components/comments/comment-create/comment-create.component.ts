import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { CommentService } from 'src/app/core/services/comment.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {
  @ViewChild('f') createCommentForm: NgForm;
  @Input() post: Object;
  @Output() postCommentEmmiter: EventEmitter<any> = new EventEmitter();
  comments: Object[];

  constructor() { }

  ngOnInit() {
  }

  postComment() {
    this.postCommentEmmiter.emit(this.createCommentForm.value);
    this.createCommentForm.reset();
  }

}
