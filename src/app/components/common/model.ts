export interface MenuItem {
  routerLink?: string;
  label?: string;
  url?: string;
  isHeader?: boolean;
  icon?: string;
  children?: MenuItem[];
  $expand?: boolean;
}
