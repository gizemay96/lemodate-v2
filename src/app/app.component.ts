import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'landing-page';

  constructor(){
    window.location.hash = '#section1';
  }
  
  scrollUp() {
    console.log('Mouse wheel scrolled up');
  }

  scrollDown() {
    console.log('Mouse wheel scrolled down');
  }


}


