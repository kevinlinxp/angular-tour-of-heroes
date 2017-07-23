import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { HeroSearchComponent } from './hero-search.component';

/* Angular apps are modular and Angular has its own modularity system called
 * Angular modules or NgModules.
 *
 * An Angular module, whether a root or feature, is a class with an @NgModule
 * decorator.
 *
 * Decorators are functions that modify JavaScript classes. Angular has many
 * decorators that attach metadata to classes so that it knows what those
 * classes mean and how they should work. */
@NgModule({
  /* -- "What do I need?"
   * Other modules whose exported classes are needed by component templates
   * declared in this module.
   *
   * Only NgModule classes go in the imports array. Don't put any other kind of
   * class in imports. */
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  /* -- "What do I have?"
   * The view classes that belong to this module. Angular has three kinds of
   * view classes: components, directives, and pipes
   *
   * You must declare every component in one (and only one) NgModule class.
   * You tell Angular which components belong to the AppModule by listing it
   * in the module's declarations array. As you create more components, you'll
   * add them to declarations.
   * */
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeroSearchComponent
  ],
  /* -- "What do I provide"?
   * The subset of declarations that should be visible and usable in the
   * component templates of other modules. */
  exports: [
    // A root module has no reason to export anything because other components
    // don't need to import the root module.
  ],
  /* Creators of services that this module contributes to the global collection
   * of services; they become accessible in all parts of the app.
   *
   * The "HeroService" below is a shorthand expression for:
   *  { provide: HeroService, useClass: HeroService }
   *  Other forms:
   *  { provide: ..., useValue: ... }
   *  { provide: ..., useExisting: ... }
   *  { provide: ..., useFactory: ..., deps: [..., ...] } */
  providers: [ HeroService ],
  /* The main application view, called the root component, that hosts all other
   * app views. Only the root module should set this bootstrap property. */
  bootstrap: [ AppComponent ]
})
/* Every Angular app has at least one Angular module class, the root module,
 * conventionally named AppModule.
 *
 * While the root module may be the only module in a small application, most
 * apps have many more feature modules, each a cohesive block of code dedicated
 * to an application domain, a workflow, or a closely related set of
 * capabilities. */
export class AppModule { }

/*
 * Angular Module vs. JavaScript Module:
 *
 * In JavaScript each file is a module and all objects defined in the file
 * belong to that module. The module declares some objects to be public by
 * marking them with the export key word. Other JavaScript modules use import
 * statements to access public objects from other modules.
 * */
