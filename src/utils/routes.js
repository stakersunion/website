import { faPage, faGauge, faUser } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const routes = {
  home: { path: '/', title: 'Dashboard', icon: faGauge },
  account: {
    path: '/account/profile',
    title: 'Account',
    icon: faUser,
    children: {
      profile: { path: '/account/profile', title: 'Profile' },
      addresses: { path: '/account/addresses', title: 'Addresses' },
      validators: { path: '/account/validators', title: 'Validators' },
    },
  },
  proposal: {
    path: 'https://docs.stakersunion.com',
    title: 'Proposal',
    icon: faPage,
    target: '_blank',
  },
  admin: {
    path: '/admin/users',
    title: 'Admin',
    hidden: true,
    children: {
      users: { path: '/admin/users', title: 'Users' },
    },
  },
}

export default routes
