import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'zp-card-header,[zp-card-header],zp-accordion-header,[zp-accordion-header]',
  template: `<ng-content></ng-content>`,
  host: {
    '[style.display]': '"block"'
  }
})
export class CardHeaderComponent {
}
