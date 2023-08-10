import { Box, Home, ShoppingBag } from 'react-feather';

export const MENUITEMS = [
  {
    path: '/',
    title: 'Dashboard',
    icon: Home,
    type: 'link',
    badgeType: 'primary',
    active: false,
  },
  {
    title: 'Products',
    icon: Box,
    type: 'sub',
    active: false,
    children: [
      { path: '/products/add-product', title: 'Add Product', type: 'link' },
      { path: '/products/list-product', title: 'List Product', type: 'link' },
    ],
  },
  {
    path: '/sale-of-point',
    title: 'Sale Of Point',
    icon: ShoppingBag,
    type: 'link',
    badgeType: 'primary',
    active: false,
  },
];
