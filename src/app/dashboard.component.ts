import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  // Set the moduleId property to module.id for module-relative loading of the
  // templateUrl.
  moduleId: module.id,
  selector: 'dashboard',
  // template: '<h3>My Dashboard</h3>'
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroService.getHeroesSlowly()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }
}
