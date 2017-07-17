import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <!--
        We add an anchor tags which, when clicked, triggers navigation to the
        corresponding component.

        We nested the two links within <nav> tags. They don't do anything yet but
        they'll be convenient when we style the links a little later.
      -->
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
    </nav>

    <!--
      RouterOutlet is one of the directives provided by the RouterModule. The
      router displays each component immediately below the <router-outlet> as we
      navigate through the application.
    -->
    <router-outlet></router-outlet>
  `,
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
  title = 'Tour of Heros';
}

/* The AppComponent is now attached to a router and displaying routed views. For
 * this reason and to distinguish it from other kinds of components, we call this
 * type of component a Router Component. */
