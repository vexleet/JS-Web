import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() isLoggedIn: boolean;
  @Input() username: string;
  @Output() logoutEmitter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  logout() {
    this.logoutEmitter.emit();
  }

}
