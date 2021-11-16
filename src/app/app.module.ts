import { ViewportScroller } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, Scroll } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MousewheelDirective } from './directives/mousewheel.directive';
import { HomeComponent } from './pages/home/home.component';
import { Section1Component } from './pages/section1/section1.component';
import {filter} from 'rxjs/operators'

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    MousewheelDirective,
    HomeComponent,
    Section1Component
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { 
  constructor(router: Router, viewportScroller: ViewportScroller) {
    viewportScroller.setOffset([0, 50]);
    router.events.pipe(filter(e => e instanceof Scroll)).subscribe((e: any) => {
      if (e.anchor) {
        // anchor navigation
        /* setTimeout is the core line to solve the solution */
        setTimeout(() => {
          viewportScroller.scrollToAnchor(e.anchor);
        })
      } else if (e.position) {
        // backward navigation
        viewportScroller.scrollToPosition(e.position);
      } else {
        // forward navigation
        viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }
}
