import { Component } from '@angular/core';
import { IHero } from './interfaces/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  heroes: Array<IHero> = [];

  constructor() { }

  ngOnInit() {
  }

  addHero(currentHero: string) {
    if (currentHero === "") {
      console.log("Hero name must be at least 1 character long");
      return;
    }

    let newHero: IHero = {
      name: currentHero,
      health: 20,
    };

    this.heroes = this.heroes.concat(newHero);
  }

  attackHero(index: number) {
    this.heroes[index].health -= 5;
  }

  reviveHero(index) {
    this.heroes[index].health = 20;
  }
}
