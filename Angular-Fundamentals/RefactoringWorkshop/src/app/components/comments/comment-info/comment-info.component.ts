import { CommentService } from 'src/app/core/services/comment.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment-info',
  templateUrl: './comment-info.component.html',
  styleUrls: ['./comment-info.component.css']
})
export class CommentInfoComponent implements OnInit {
  @Input() comments: Object[];
  @Input() post: Object;
  @Input() isAuthor: boolean;
  @Output() deleteCommentEmmiter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  deleteComment(id: string) {
    this.deleteCommentEmmiter.emit(id);
  }

}
