import { Component } from '@angular/core';
import { IHero } from './interfaces/index';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  heroes: IHero[];

  constructor(private heroService: HeroService) {
    this.heroes = heroService.heroes;
  }

  ngOnInit() {
  }

  addHero(currentHero: string) {
    this.heroService.addHero(currentHero);
  }

  attackHero(index: number) {
    this.heroService.attackHero(index);
  }

  reviveHero(index: number) {
    this.heroService.reviveHero(index);
  }

}
