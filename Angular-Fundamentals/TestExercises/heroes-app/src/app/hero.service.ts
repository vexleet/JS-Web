import { Injectable } from '@angular/core';
import { IHero } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  heroes: IHero[] = [
    {
      name: "pesho",
      health: 20,
    }
  ];

  constructor() { }

  addHero(currentHero: string) {
    if (currentHero === "") {
      console.log("Hero name must be at least 1 character long");
      return;
    }

    let newHero: IHero = {
      name: currentHero,
      health: 20,
    };

    this.heroes.push(newHero);
  }

  attackHero(index: number) {
    let currentHero = this.heroes[index];
    this.heroes[index] = { ...currentHero, health: currentHero.health - 5 };
  }

  reviveHero(index: number) {
    let currentHero = this.heroes[index];
    this.heroes[index] = { ...currentHero, health: 20 };
  }
}
