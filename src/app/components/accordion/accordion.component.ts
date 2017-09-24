import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {CardGroup} from '../card/card-group.model';
import {CardComponent} from '../card/card.component';
import {ZeptoNGConfig} from '../zepto-ng.config';

@Component({
  selector: 'zp-accordion',
  templateUrl: './accordion.component.html',
  exportAs: 'accordion',
  providers: [{provide: CardGroup, useExisting: forwardRef(() => AccordionComponent)}]
})
export class AccordionComponent extends CardGroup {
  @Input() keepOntItem: boolean;

  constructor(zeptoNGConfig: ZeptoNGConfig) {
    super();
    this.keepOntItem = zeptoNGConfig.accordion.keepOneItem;
    this.type = <any>zeptoNGConfig.accordion.type;
  }

  protected initCard(card: CardComponent) {
    card.collapsable = true;
    card.isCollapsed = true;
    card.collapse.subscribe(collapse => {
      if (!collapse) {
        this.keepOnePanelOpen(card);
      }
    });
  }

  toggleById(id) {
    const card = this.cards.find(item => item.id === id);
    this.toggle(card);
  }

  toggle(card: CardComponent) {
    if (card) {
      card.onCollapse();
    }
  }

  private keepOnePanelOpen(card: CardComponent) {
    if (this.keepOntItem) {
      this.cards.forEach(item => {
        if (item !== card) {
          item.isCollapsed = true;
        }
      });
    }

  }
}
