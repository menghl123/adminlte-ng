import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'zp-card-body,[zp-card-body],zp-accordion-body,[zp-accordion-body]',
  template: `
    <ng-content></ng-content>`,
  host: {
    '[style.display]': '"block"'
  }
})
export class CardBodyComponent {
}
