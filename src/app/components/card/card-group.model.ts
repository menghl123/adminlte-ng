import {Input} from '@angular/core';
import {CardComponent} from './card.component';

export abstract class CardGroup {
  @Input() type: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger';
  @Input() cssClass: string;
  cards: CardComponent[] = [];

  $addItem(card: CardComponent) {
    this.$removeItem(card);
    if (this.type) {
      card.type = this.type;
    }
    card.cssClass = this.cssClass;
    this.initCard(card);
    this.cards.push(card);
  }

  $removeItem(card: CardComponent) {
    if (card) {
      const index = this.cards.findIndex(item => item === card);
      this.removeItemByIndex(index);
    }
  }

  private removeItemByIndex(index: number) {
    if (index !== -1) {
      this.cards.splice(index, 1);
    }
  }

  protected abstract initCard(card: CardComponent);
}
