import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./routes/home/home.component').then(m => m.HomeComponent),
    title: 'Home | Requirement Task',
  },
  {
    path: 'periodic',
    pathMatch: 'full',
    loadComponent: () =>
      import('./routes/periodic/periodic.component').then(
        m => m.PeriodicComponent
      ),
    title: 'Table | Requirement Task',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./routes/not-found/not-found.component').then(
        m => m.NotFoundComponent
      ),
    title: 'Not Found | Requirement Task',
  },
];
