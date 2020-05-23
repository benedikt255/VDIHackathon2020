import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('logoAni', [
      transition('* => *', [
        query(':enter', style({opacity: 0}), {optional: true}),
        query(':enter', stagger('100ms', [
          animate('1s', style({opacity: 1}))
        ]), {optional: true})
      ])
    ])
  ]
})
export class AppComponent {
  title = 'ConnectING';

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
