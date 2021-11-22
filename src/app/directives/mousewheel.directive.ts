import { Directive, Output, HostListener, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Options, SwipeEventListener } from 'swipe-event-listener'

@Directive({
  selector: '[appMousewheel]'
})
export class MousewheelDirective {
  activeInd = 0;

  sections = [
    { url: 'section1' },
    { url: 'section2' },
    { url: 'section3' },
    { url: 'section4' },
    { url: 'section5' },
    { url: 'section6' },
  ]

  @Output() mouseWheelUp = new EventEmitter();
  @Output() mouseWheelDown = new EventEmitter();
  @Output() sectionChanged = new EventEmitter();

  @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener('onmousewheel', ['$event']) onMouseWheelIE(event: any) {
    this.mouseWheelFunc(event);
  }

  // @HostListener('touchstart', ['$event']) onTouchStart(event: any) {
  //   const active = document.querySelector('body') as any;
  //   active.style.touchAction = 'none'
  // }

  constructor(private router: Router) {

    const { swipeArea, updateOptions } = SwipeEventListener({
      swipeArea: document.querySelector('body') as any,
      swipeSensitivity: 15,
      listenForTouchEvents: true
    });

    swipeArea.addEventListener('swipeDown', (event: any) => {
      const active = document.getElementById(window.location.hash.split('#')[1]) as any;
      const atSectionTop = active && active.scrollTop === 0;

      if (atSectionTop) {
        this.mouseWheelFunc('', 10)
      }

      // for IE
      event.returnValue = false;
      // for Chrome and Firefox
      if (event.preventDefault) {
        event.preventDefault();
      }
    });
    swipeArea.addEventListener('swipeUp', (event: any) => {
      const active = document.getElementById(window.location.hash.split('#')[1]) as any;
      const atSectionBottom = active && (active.offsetHeight + active.scrollTop >= active.scrollHeight);

      if (atSectionBottom) {
        this.mouseWheelFunc('', -10)
      }

      // for IE
      event.returnValue = false;
      // for Chrome and Firefox
      if (event.preventDefault) {
        event.preventDefault();
      }
      return;
    });

    swipeArea.addEventListener('swipeLeft', (event: any) => {
      console.log('swipe left');
      // for IE
      event.returnValue = false;
      // for Chrome and Firefox
      if (event.preventDefault) {
        event.preventDefault();
      }
    });

    swipeArea.addEventListener('swipeRight', (event: any) => {
      console.log('swipe right');
      // for IE
      event.returnValue = false;
      // for Chrome and Firefox
      if (event.preventDefault) {
        event.preventDefault();
      }
    });


  }



  mouseWheelFunc(event: any, swipeDelta?: any) {
    this.activeInd = this.sections.findIndex(section => section.url === window.location.hash.split('#')[1]);
    const active = document.getElementById(window.location.hash.split('#')[1]) as any;
    const atSectionTop = active && active.scrollTop === 0;
    const atSectionBottom = active && (active.offsetHeight + active.scrollTop >= active.scrollHeight);
    var event = window.event || event; // old IE support
    var delta = swipeDelta ? swipeDelta : Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

    setTimeout(() => {
      // active.style.touchAction = 'auto';
      if (delta > 0 && atSectionTop) {
        this.mouseWheelUp.emit(event);
        this.sectionChanged.emit();
        const newInd = this.activeInd === 0 ? 0 : this.activeInd - 1;
        this.router.navigate(['home/'], { fragment: this.sections[newInd].url });

      } else if (delta < 0 && atSectionBottom) {
        const newInd = this.activeInd + 1 === this.sections.length ? 0 : this.activeInd + 1;
        this.sectionChanged.emit();
        this.mouseWheelDown.emit(event);
        this.router.navigate(['home/'], { fragment: this.sections[newInd].url });
      }

    }, 500);

    // for IE
    event.returnValue = false;
    // for Chrome and Firefox
    if (event.preventDefault) {
      event.preventDefault();
    }
  }

}
