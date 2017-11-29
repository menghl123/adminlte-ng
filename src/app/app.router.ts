import {Routes} from '@angular/router';

export const ROUTER_CONFIG: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/index'},
  {path: 'index', loadChildren: 'app/demo/demo.module#DemoModule'},
]
