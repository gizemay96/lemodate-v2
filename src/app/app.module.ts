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
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LottieModule } from 'ngx-lottie';
import {MatMenuModule} from '@angular/material/menu';


export function HttpLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/language/', '.json')
}

import player from 'lottie-web';
export function playerFactory() {
  return player;
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgbDropdownModule,
    MatMenuModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoader,
        deps: [HttpClient]
      },
    }),
    LottieModule.forRoot({ player: playerFactory }),
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
