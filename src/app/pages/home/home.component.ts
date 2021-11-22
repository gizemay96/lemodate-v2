import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import anime from 'animejs'
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('subscription')
  subscription!: ElementRef<any>;

  activeSectionId: any;

  language: any;
  closeScrolling = false;
  imgLeftAnim: any;
  imgRightAnim: any;
  cardAnim: any;
  cardLogoAnim: any;
  cardUpAnime: any;

  options: AnimationOptions = {
    path: '/assets/pinjump.json',
    renderer: 'svg',
    loop: false,
    autoplay: true,
  };




  constructor(private translate: TranslateService) { }

  ngAfterViewInit(): void {
    var textWrapper = document.querySelector('.an-2') as any;
    if (textWrapper) {
      textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    }

    this.imgLeftAnim = anime({
      targets: '.fadeInLeft',
      translateX: [-50, 0],
      duration: 10000,
      autoplay: false,
      opacity: 1,
    })

    this.imgRightAnim = anime({
      targets: '.fadeInRight',
      translateX: [50, 0],
      duration: 10000,
      autoplay: false,
      opacity: 1,
    })

    this.cardAnim = anime({
      targets: '.openAnimation',
      translateY: [-120, 190],
      duration: 5000,
      autoplay: false,
    })

    this.cardLogoAnim = anime({
      targets: '.cardLogoAnim',
      duration: 5000,
      translateY: [-180, -210],
      autoplay: false,
      opacity: 1,
      zIndex: {
        value: [0, 1],
        round: true
      }
    })

    this.cardUpAnime = anime({
      targets: '.cardUpAnime',
      duration: 2000,
      autoplay: false,
      easing: 'easeInOutQuart',
      zIndex: {
        value: [5, 0],
        round: true
      },
    });

  }


  ngOnInit(): void {
    this.language = window.localStorage.getItem('lang');
  }

  changeLanguage(lang: string) {
    window.localStorage.setItem('lang', lang)
    this.translate.use(lang)
    this.language = lang;
  }
  public sectionChange() {
    console.log('chn')
    this.closeScrolling = true;
    setTimeout(() => {
      this.animationToggle();
    }, 150);
    setTimeout(() => {
      this.activeSectionId = window.location.hash.substring(1);
      this.closeScrolling = false;
    }, 700);
  }



  animationToggle() {
    console.log(window.location)
    if (window.location.hash === '#section2' || window.location.hash === '#section4') {
      this.imgRightAnim.restart();
    }
    if (window.location.hash === ('#section3')) {
      this.imgLeftAnim.restart();
    }

    if (window.location.hash === ('#subscription')) {
      setTimeout(() => {
        this.cardAnim.restart();
        this.cardUpAnime.restart();
        this.cardLogoAnim.restart();
      }, 200);
    }
  }

  getCurrentRoute() {
    return window.location.hash === 'about/2'
  }


  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  getSection(e: HTMLElement) {
    window.scrollTo(0, this.subscription.nativeElement.offsetTop)
  }

}
