import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IHero } from '../interfaces/index';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})

export class HeroComponent implements OnInit {
  @Input() hero: IHero;
  @Output() attackEvent: EventEmitter<any> = new EventEmitter();
  @Output() reviveEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  attackHero() {
    this.attackEvent.emit();
  }

  reviveHero() {
    this.reviveEvent.emit();
  }

}
