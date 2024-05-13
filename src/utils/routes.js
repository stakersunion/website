import { faHome, faPage, faGauge, faUser } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const routes = {
  home: { path: '/', title: 'Home', icon: faHome },
  proposal: {
    path: 'https://docs.stakersunion.com',
    title: 'Proposal',
    icon: faPage,
    target: '_blank',
  },
  profile: { path: '/profile', title: 'Profile', icon: faUser },
}

export default routes
