import {Component, HostListener, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {SwUpdate} from "@angular/service-worker";


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
export class AppComponent implements OnInit {
  title = 'ConnectING';

  constructor(private swUpdate: SwUpdate) {
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  ngOnInit() {

    if (this.swUpdate.isEnabled) {

      this.swUpdate.available.subscribe(() => {

        if (confirm('New version available. Load New Version?')) {
          window.location.reload();
        }
      });
    }
  }
}
