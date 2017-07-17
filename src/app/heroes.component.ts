import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';

/* A component controls a patch of screen called a view. */
@Component({
  /* In fact, HeroListComponent is just a class. It's not an angular component
   * until you tell Angular about it, by attaching this metadata object using a
   * @Component decorator
   *
   * The template, metadata, and component class together describe a view. */

  /* Sets the source of the base address (module.id) for module-relative URLs
   * such as the templateUrl */
  moduleId: module.id,

  /* CSS selector that tells Angular to create and insert an instance of this
   * component, where it finds the specified tag in parent HTML */
  selector: 'my-heroes',

  /* Module-relative address of this component's HTML template */
  templateUrl: './heroes.component.html',
  styleUrls: [ './heroes.component.css' ]

  /* Array of dependency injection providers for services that the component
   * requires. This is one way to tell Angular that the component's constructor
   * requires a HeroService so it can get the list of heroes to display. */
  /* providers: [ ... ] */
})
/* You define a component's application logic inside a class to support the view.
 * The class interacts with the view through an API of properties and methods. */
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  selectedHero: Hero;

  /* Angular creates, updates, and destroys components as the user moves through
   * the application. Your app can take action at each moment in this lifecycle
   * through optional lifecycle hooks, like ngOnInit() */
  ngOnInit(): void {
    this.getHeros();
  }

  /* The constructor parameter type, the @Component decorator, and the parent's
   * providers information combine to tell the Angular injector to inject an
   * instance of HeroService whenever it creates a new HeroListComponent. */
  constructor(private router: Router, private heroService: HeroService) { }

  getHeros(): void {
    // this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.createHero(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) {
          this.selectedHero = null;
        }
      });
  }
}

/**
 * Apply other metadata decorators in a similar fashion to guide Angular
 * behavior. @Injectable, @Input, and @Output are a few of the more popular
 * decorators.
 *
 * The architectural takeaway is that you must add metadata to your code so that
 * Angular knows what to do.
 */
