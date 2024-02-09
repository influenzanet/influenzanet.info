import { Component } from "@angular/core";
import { animate, keyframes, query, style, transition, trigger } from "@angular/animations";


@Component({
  selector: 'influenza-net-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter',  [
            animate('100ms ease',
              keyframes([
                style({
                  opacity: '0',
                  transform: 'scale(1.1, 1.1)',
                }),
                style({
                  opacity: '1',
                  transform: 'scale(1, 1)',
                })
              ])
            ),
          ],
          { optional: true }),
      ]),
    ])
  ]
})
export class AppComponent{}
