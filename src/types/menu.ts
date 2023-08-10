import { Icon } from "react-feather";

export interface IMenu {
  path: string;
  title: string;
  icon: Icon;
  type: string;
  badgeType?: string;
  active: boolean;
  // eslint-disable-next-line
  children?: any;
}