import { CommentService } from 'src/app/core/services/comment.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPostInfo, ICommentInfo } from 'src/app/core/models';

@Component({
  selector: 'app-comment-info',
  templateUrl: './comment-info.component.html',
  styleUrls: ['./comment-info.component.css']
})
export class CommentInfoComponent implements OnInit {
  @Input() comments: ICommentInfo[];
  @Output() deleteCommentEmmiter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  deleteComment(id: string) {
    this.deleteCommentEmmiter.emit(id);
  }

  isAuthor(comment: ICommentInfo) {
    return comment['_acl']['creator'] === localStorage.getItem('userId');
  }

}
