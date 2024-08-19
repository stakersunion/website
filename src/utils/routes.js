import {
  faPage,
  faHandHoldingHeart,
  faUser,
  faHexagonImage,
  faHandFist,
  faHandshakeAngle,
  faUserTie,
} from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { faDiscord, faXTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
import path from 'path'

const routes = {
  home: {
    path: '/',
    title: 'Stakers Union',
    target: '_blank',
    hidden: true,
  },
  get_involved: {
    apply: {
      title: 'Unite',
      description: 'Apply to join the Stakers Union today!',
      path: '/apply',
      icon: faHandFist,
    },
    proposal: {
      title: 'Proposal',
      description: 'Read the Stakers Union proposal.',
      path: 'https://docs.stakersunion.com',
      icon: faPage,
      target: '_blank',
    },
    discord: {
      title: 'Discord',
      description: 'Join the Discord to get help and chat with other members.',
      path: 'https://discord.com/invite/vAGDagR7JT',
      icon: faDiscord,
      target: '_blank',
    },
    poap: {
      title: 'POAP',
      description: 'Mint a POAP to express your support!',
      path: 'https://poap.website/probably-arrive-detail',
      icon: faHexagonImage,
      target: '_blank',
    },
  },
  contribute: {
    partnerships: {
      title: 'Partnerships',
      description: 'Learn more about our partners and how to become one.',
      path: '/#partnerships',
      icon: faHandshakeAngle,
    },
    pledge: {
      title: 'Pledge',
      description: 'Learn about how you can give back by taking the Stakers Union Pledge.',
      path: '/pledge',
      icon: faHandHoldingHeart,
    },
    leadership: {
      title: 'Leadership',
      description: 'Guide our mission. Step up and lead the Stakers Union.',
      path: 'https://docs.stakersunion.com/governance',
      icon: faUserTie,
      target: '_blank',
    },
  },
  follow: {
    twitter: {
      title: 'Twitter',
      description: 'Follow us on X/Twitter for the latest updates.',
      path: 'https://x.com/stakersunion',
      icon: faXTwitter,
      target: '_blank',
    },
    github: {
      title: 'GitHub',
      description: 'Check out and contribute to our code on GitHub.',
      path: 'https://github.com/stakersunion/',
      icon: faGithub,
      target: '_blank',
    },
    discord: {
      title: 'Discord',
      description: 'Join the Discord to get help and chat with other members.',
      path: 'https://discord.gg/vAGDagR7JT',
      icon: faDiscord,
      target: '_blank',
    },
    farcaster: {
      title: 'Farcaster',
      description: 'Join us on Farcaster for the latest updates.',
      path: 'https://warpcast.com/stakersunion',
      image: '/icons/farcaster.svg',
      target: '_blank',
    }
  },
  account: {
    path: '/account',
    title: 'Account',
    icon: faUser,
    children: {
      dashboard: { path: '/account/dashboard', title: 'Dashboard' },
      profile: { path: '/account/profile', title: 'Profile' },
      status: { path: '/account/status', title: 'Status' },
      addresses: { path: '/account/addresses', title: 'Addresses' },
      validators: { path: '/account/validators', title: 'Validators' },
      appeal: { path: '/account/appeal', title: 'Appeal' },
    },
  },
  apply: {
    path: '/apply',
    title: 'Apply',
    hidden: true,
    children: {
      profile: {
        path: '/apply/profile',
        title: 'Profile',
        description: 'Set up account information',
      },
      eligibility: {
        path: '/apply/eligibility',
        title: 'Eligibility',
        description: 'Sign the Stakers Union oath',
      },
      independent: {
        path: '/apply/independent',
        title: 'Independent Operation',
        description: 'Schedule verification of node operation',
      },
      residential: {
        path: '/apply/residential',
        title: 'Residential Operation',
        description: 'Submit a photo of your home node',
      },
    },
  },
  proposal: {
    path: 'https://docs.stakersunion.com',
    title: 'Proposal',
    icon: faPage,
    target: '_blank',
  },
  admin: {
    path: '/admin',
    title: 'Admin',
    hidden: true,
    children: {
      users: {
        path: '/admin/users',
        title: 'Users',
        children: {
          user: { path: '/admin/users/[id]', title: 'User' },
          address: { path: '/admin/users/[id]/address/[address]', title: 'Address' },
        },
      },
      news: { path: '/admin/news', title: 'News' },
    },
  },
}

const getRoute = ({ path, params }) => {
  let generatedPath = path
  for (const [key, value] of Object.entries(params)) {
    generatedPath = generatedPath.replace(`[${key}]`, value)
  }
  return generatedPath
}

export { routes, getRoute }
