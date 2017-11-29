export interface MenuItem {
  routerLink?: string;
  label?: string;
  url?: string;
  isHeader?: boolean;
  isDivider?: boolean;
  icon?: string;
  children?: MenuItem[];
  $expand?: boolean;
  $routerLinkActive?: boolean;
  command?: any;
}

export interface CustomItem {
  type: 'messages-menu' | 'tasks-menu' | 'notifications-menu' | 'user-menu';
}
