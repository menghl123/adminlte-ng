import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeViewComponent } from './tree-view.component';
import { TreeNodeComponent } from './tree-node.component';
import { FormsModule } from '@angular/forms';
import { DraggableModule } from '../draggable';
import { TreePanelComponent } from './tree-panel.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DraggableModule
  ],
  providers: [],
  declarations: [
    TreeViewComponent,
    TreeNodeComponent,
    TreePanelComponent
  ],
  exports: [
    TreeViewComponent,
    TreeNodeComponent,
    TreePanelComponent
  ],
})
export class TreeViewModule {
}
