import { Component, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'lte-tree-panel',
  templateUrl: './tree-panel.component.html'
})
export class TreePanelComponent {
  @Input() treeData: any[];
  @Input() parentNode: any;
  @Input() valueField;
  @Input() textField;
  @Input() nodeCssClass: string;
  @Input() iconField: string;
  @Input() checkable = false;
  @Input() lazyLoad = false;
  @Input() loadingIcon: string;
  @Input() loadChildren: (parent: any) => Observable<any[]>;
  @Input() allowDraggable = false;
  @Input() allowMutipleSelected = false;
  @Input() nodeItemTemplate: TemplateRef<any>;
  @Input() nodeItemToolbarTemplate: TemplateRef<any>;
  @Input() leafIcon;
  @Input() expendIcon;
  @Input() collapseIcon;
  @Output() nodeItemCheckedChanged = new EventEmitter<any>();


  onNodeItemCheckedChanged(node) {
    this.nodeItemCheckedChanged.emit(node);
  }
}
