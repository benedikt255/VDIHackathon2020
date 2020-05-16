import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('logoAni', [
        transition('* => *', [
            query(':enter', style({ opacity: 0 }), { optional: true }),
            query(':enter', stagger('100ms', [
                animate('1s', style({ opacity: 1 }))
            ]), { optional: true })
        ])
    ])
]
})
export class AppComponent {
  title = 'VDIApp';
  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
