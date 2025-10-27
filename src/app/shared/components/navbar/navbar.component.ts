import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { routes } from '../../../app.routes';
import { filter, map, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  router = inject(Router);

  routes = routes.map((route) => ({
    path: route.path,
    title: `${route.title ?? 'Maps en Angular'}`
  })).filter(route => route.path !== '**')

  pageTitle$ = this.router.events
   .pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      tap((event) => console.log(event)),
      map((event) => event.urlAfterRedirects),
      map((url) => routes.find((route) => `/${route.path}` === url)!.title ?? 'Mapas')
   )
}
