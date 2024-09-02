import { LuLayoutDashboard } from 'react-icons/lu';
import { IoMdAdd } from 'react-icons/io';
import { IShortUrl } from '../common';
import { MdLink, MdLinkOff, MdOutlineLink } from 'react-icons/md';
import { BsGraphUp } from 'react-icons/bs';
import { ImTable2 } from 'react-icons/im';
import { CgProfile } from 'react-icons/cg';

export const DASHBOARD_NAVIGATION = [
  {
    title: 'Home',
    Icon: LuLayoutDashboard,
    link: '/dashboard',
  },
  {
    title: 'Add',
    Icon: IoMdAdd,
    link: '/dashboard/add',
  },
  {
    title: 'All Links',
    Icon: ImTable2,
    link: '/dashboard/all-links',
  },
  {
    title: 'Profile',
    Icon: CgProfile,
    link: '/dashboard/profile',
  },
];

export const getDashboardCardDetails = (data: IShortUrl[]) => {
  return [
    {
      title: 'Total Links',
      value: data?.length || 0,
      description: 'Total all links',
      Icon: MdOutlineLink,
    },
    {
      title: 'Total Clicks',
      value: data?.reduce((prev, { clicks }) => prev + clicks, 0) || 0,
      description: 'Total clicks of all link',
      Icon: BsGraphUp,
    },
    {
      title: 'Active Links',
      value: data?.filter(({ isActive }) => isActive)?.length || 0,
      description: 'All active links',
      Icon: MdLink,
    },
    {
      title: 'Inactive Links',
      value: data?.filter(({ isActive }) => !isActive)?.length || 0,
      description: 'All inactive links',
      Icon: MdLinkOff,
    },
  ];
};
