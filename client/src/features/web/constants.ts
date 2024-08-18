import { FaLink } from 'react-icons/fa6';
import { MdQrCodeScanner } from 'react-icons/md';
import { VscGraphLine } from 'react-icons/vsc';
import { INavigationLink, IServices, IStep } from './types';

export const NAVIGATION_LINKS: INavigationLink[] = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Product',
    link: '/#product',
  },
  {
    name: 'How to use',
    link: '/#how-to-use',
  },
  {
    name: 'Contact',
    link: '/#contact-us',
  },
];

export const STEPS: IStep[] = [
  {
    title: 'Create Short Link',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
    bgColor: 'bg-blue-300',
    textColor: 'text-blue-600',
  },
  {
    title: 'Create Short Link',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
    bgColor: 'bg-amber-300',
    textColor: 'text-amber-800',
  },
  {
    title: 'Create Short Link',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
    bgColor: 'bg-red-300',
    textColor: 'text-red-800',
  },
  {
    title: 'Create Short Link',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
    bgColor: 'bg-green-300',
    textColor: 'text-green-800',
  },
  {
    title: 'Create Short Link',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
    bgColor: 'bg-indigo-300',
    textColor: 'text-indigo-800',
  },
];

export const SERVICES: IServices[] = [
  {
    name: 'Short Links',
    Icon: FaLink,
    cardCss: 'border-red-500 bg-red-50 text-red-700 hover:bg-red-500',
    iconCss: 'bg-red-500 group-hover:text-red-500',
  },
  {
    name: 'Generate QA',
    Icon: MdQrCodeScanner,
    cardCss: 'border-amber-500 bg-amber-50 text-amber-700 hover:bg-amber-500',
    iconCss: 'bg-amber-500 group-hover:text-amber-500',
  },
  {
    name: 'Manage your links',
    Icon: VscGraphLine,
    cardCss: 'border-green-500 bg-green-50 text-green-700 hover:bg-green-500',
    iconCss: 'bg-green-500 group-hover:text-green-500',
  },
];
