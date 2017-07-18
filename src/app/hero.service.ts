import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

// There are scores of operators like toPromise that extend Observable with
// useful capabilities. If we want those capabilities, we have to add the
// operators ourselves.
import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

/* We imported the Angular Injectable function and applied that function as an
 * @Injectable() decorator.
 * Always write @Injectable(), not just @Injectable. Our application will fail
 * mysteriously if we forget the parentheses. */
@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
    // The Angular http.get returns an RxJS Observable. Observables are a
    // powerful way to manage asynchronous data flows.
      .toPromise()
      .then(response => response.json().data as Hero[])
      .catch(this.handleError);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      // Simulate server latency with some delay
      setTimeout(() => resolve(this.getHeroes()), 800);
    });
  }

  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

  updateHero(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  createHero(name: string): Promise<Hero> {
    const url = `${this.heroesUrl}`;
    return this.http
      .post(url, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

  deleteHero(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http
      .delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
