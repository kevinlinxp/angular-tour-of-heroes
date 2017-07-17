import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes',     component: HeroesComponent }
];
@NgModule({
  // Setup the initial route configuration. And add it to our
  // AppRoutingModule. We'll add our configured AppRouterModule to the
  // AppModule imports array

  // We use the forRoot method because we're providing a configured router at the
  // root of the application. The forRoot method gives us the Router service
  // providers and directives needed for routing, and performs the initial
  // navigation based on the current browser URL
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
