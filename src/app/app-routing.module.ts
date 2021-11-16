import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Section1Component } from './pages/section1/section1.component';

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  scrollOffset: [0, 0]
};
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home-routing.module').then(m => m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
