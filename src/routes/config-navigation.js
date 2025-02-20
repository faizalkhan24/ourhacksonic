// routes
// components
import SvgColor from '../components/svg-color';
import { ADMIN_PATH_DASHBOARD } from 'routes/paths';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  question: icon('ic_question'), // Added question icon
};

const navConfig = [
  // DASHBOARD
  {
    subheader: 'main',
    items: [
      {
        title: 'Dashboard',
        path: ADMIN_PATH_DASHBOARD.root,
        icon: ICONS.dashboard,
      },
    ],
  },
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      // {
      //   title: 'User',
      //   path: ADMIN_PATH_DASHBOARD.user.root,
      //   icon: ICONS.user,
      //   children: [
      //     {
      //       title: 'Users',
      //       path: ADMIN_PATH_DASHBOARD.user.users,
      //     },
      //   ],
      // },
      {
        title: 'Questions',
        path: ADMIN_PATH_DASHBOARD.question, // Link directly to question.js
        icon: ICONS.question,
      },
    ],
  },
];

export default navConfig;
