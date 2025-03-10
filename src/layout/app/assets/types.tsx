/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

export interface HeaderProps {
  opened: boolean;
  toggle(): void;
  visibleBack?: boolean;
}

export interface SidebarProps {
  toggle(): void;
}
