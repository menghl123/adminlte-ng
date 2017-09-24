import {Component, ContentChild, EventEmitter, Host, Input, OnInit, Optional, Output} from '@angular/core';
import {CardHeaderComponent} from './card-header.component';
import {CardBodyComponent} from './card-body.component';
import {ZeptoNGConfig} from '../zepto-ng.config';
import {CardGroup} from './card-group.model';

@Component({
  selector: 'zp-card,zp-accordion-item',
  templateUrl: './card.component.html',
  exportAs: 'panel'
})
export class CardComponent implements OnInit {
  @Input() id;
  @Input() type: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger' = 'default';
  @Input() collapsable: boolean;
  @Input() isCollapsed = false;
  @Input() cssClass: string;
  @Output() collapse = new EventEmitter<boolean>();
  @ContentChild(CardHeaderComponent) cardHeader;
  @ContentChild(CardBodyComponent) cardBody;

  constructor(@Optional() @Host() private cardGroup: CardGroup, zeptoNGConfig: ZeptoNGConfig) {
    this.type = <any>zeptoNGConfig.card.type;
    this.collapsable = zeptoNGConfig.card.collapsable;
  }

  ngOnInit() {
    if (this.cardGroup) {
      this.cardGroup.$addItem(this);
    }
  }

  onCollapse() {
    if (this.collapsable) {
      this.isCollapsed = !this.isCollapsed;
      this.collapse.emit(this.isCollapsed);
    }
  }

}
