// component
import Iconify from '../../components/Iconify';
// ----------------------------------------------------------------------
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Leads',
    path: '/dashboard/leads',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Contacts',
    path: '/dashboard/contacts',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Contract',
    path: '/dashboard/contract',
    icon: getIcon('eva:people-fill'),
  },

  // {
  //   title: 'user',
  //   path: '/dashboard/user',
  //   icon: getIcon('eva:people-fill'),
  // },
  // {
  //   title: 'blocked Business',
  //   path: '/dashboard/blockedBusiness',
  //   icon: getIcon('gridicons:block'),
  // },
  // {
  //   title: 'verified Business',
  //   path: '/dashboard/verifiedBusiness',
  //   icon: getIcon('uil:comment-verify'),
  // },
  // {
  //   title: 'Appointment',
  //   path: '/dashboard/appointment',
  //   icon: getIcon('teenyicons:appointments-outline'),
  // },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: getIcon('eva:shopping-bag-fill'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon('eva:file-text-fill'),
  // },
  // {
  //   title: 'singlelisting',
  //   path: '/dashboard/singlebusinessdetails',
  //   icon: getIcon('eva:person-add-fill'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];
export default navConfig;
