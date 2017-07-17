import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { HeroSearchService } from './hero-search.service';
import { Hero } from './hero';

@Component({
  moduleId: module.id,
  selector: 'hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {

  heroes: Observable<Hero[]>;

  // A Subject is a producer of an observable event stream; searchTerms produces
  // an Observable of strings, the filter criteria for the name search.
  private searchTerms = new Subject<string>();

  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router) {}

  // Push a search term into the observable stream
  search(term: string): void {
  // Each call to search puts a new string into this subject's observable stream
  // by calling next.
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    // A Subject is also an Observable. We're going to turn the stream of search
    // terms into a stream of Hero arrays and assign the result to the heroes
    // property.
    this.heroes = this.searchTerms
    // wait 300ms after each keystroke before considering the term
    .debounceTime(300)
    // ignore if next search term is same as previous
    .distinctUntilChanged()
    // switch to new observable each time the term changes
    .switchMap(term =>
      term
      ? this.heroSearchService.search(term)
      : Observable.of<Hero[]>([]))
    .catch(error => {
      // TODO: add real error handling
      console.log(error);
      return Observable.of<Hero[]>([]);
    });
  }

  gotoDetail(hero: Hero): void {
    const link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
