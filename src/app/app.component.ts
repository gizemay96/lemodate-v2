import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'landing-page';

  constructor(private translate: TranslateService){
    const lang = window.localStorage.getItem('lang');

    if (lang) {
      this.translate.use(lang)
    } else {
      window.localStorage.setItem('lang' , 'tr')
    }
    window.location.hash = '#section1';

  }
  
  scrollUp() {
    console.log('Mouse wheel scrolled up');
  }

  scrollDown() {
    console.log('Mouse wheel scrolled down');
  }

  changeTo(lang: string) {
    window.localStorage.setItem('lang', lang)
    this.translate.use(lang)
  }


}


