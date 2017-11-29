import {Routes} from '@angular/router';
import {DemoComponent} from './demo.component';
import {LayoutComponent} from './layout/layout.component';
import {LayoutTopnavigationComponent} from './layout/layoutDemos/layout-topnavigation.component';
import {TabDemoComponent} from './tab-demo/tab-demo.component';
import {BoxDemoComponent} from './box-demo/box-demo.component';
import {AccordionDemoComponent} from './accordion-demo/accordion-demo.component';
import {MinimalDemoComponent} from './minimal-demo/minimal-demo.component';
import {SplitButtonDemoComponent} from './split-button-demo/split-button-demo.component';
import {AlerBoxDemoComponent} from './aler-box-demo/aler-box-demo.component';
import {ProgressBarDemoComponent} from './progress-bar-demo/progress-bar-demo.component';
import {CarouselDemoComponent} from './carousel-demo/carousel-demo.component';

export const ROUTER_CONFIG: Routes = [
  {
    path: '', component: DemoComponent, children: [
    {path: 'layout', component: LayoutComponent},
    {path: 'tab', component: TabDemoComponent},
    {path: 'box', component: BoxDemoComponent},
    {path: 'accordion', component: AccordionDemoComponent},
    {path: 'autocomplete', component: MinimalDemoComponent},
    {path: 'splitButton', component: SplitButtonDemoComponent},
    {path: 'alerBox', component: AlerBoxDemoComponent},
    {path: 'progressBar', component: ProgressBarDemoComponent},
    {path: 'carousel', component: CarouselDemoComponent},
  ]
  },
  {
    path: 'layout-topnavigation', component: LayoutTopnavigationComponent
  }
]
