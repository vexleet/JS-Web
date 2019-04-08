import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPostInfo } from 'src/app/core/models';

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.css']
})
export class PostInfoComponent implements OnInit {
  @Input() post: IPostInfo;
  @Input() i: number;
  @Input() isAuthor: boolean;
  @Output() deleteEmmiter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  deletePost(postId) {
    this.deleteEmmiter.emit(postId);
  }

}
