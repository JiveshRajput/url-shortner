import { IconType } from 'react-icons';

export * from './page';
export * from './screen';

export interface INavigationLink {
  name: string;
  link: string;
}
export interface IServices {
  name: string;
  cardCss: string;
  iconCss: string;
  Icon: IconType;
}
export interface IStep {
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
}
