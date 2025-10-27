import { Routes } from '@angular/router';
import { FullscreenMapPage } from './pages/fullscreen-map-page/fullscreen-map-page';
import { MarkersPage } from './pages/markers-page/markers-page';
import { HousesPages } from './pages/houses-pages/houses-pages';

export const routes: Routes = [
  {
    path: 'fullscreen',
    component: FullscreenMapPage,
    title: 'Vista completa'
  },
  {
    path: 'markers',
    component: MarkersPage,
    title: 'Marcadores'
  },
  {
    path: 'houses',
    component: HousesPages,
    title: 'Propiedades disponibles'
  },
  {
    path: '**',
    redirectTo: 'fullscreen'
  },
];
