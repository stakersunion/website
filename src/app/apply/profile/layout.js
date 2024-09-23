'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { routes } from '@/utils/routes'

const ApplyProfileLayout = ({ children }) => {
  const pathname = usePathname()
  const tabs = Object.keys(routes.apply.children.profile.children).map((key) => {
    const tab = routes.apply.children.profile.children[key]
    return {
      value: key,
      label: tab.title,
      path: tab.path,
      icon: tab.icon,
    }
  })

  return (
    <div className={'flex flex-col sm:flex-row gap-6'}>
      <div className={'flex flex-col sm:w-1/5 gap-2'}>
        {tabs.map((tab) => (
          <Link
            href={tab.path}
            key={tab.value}
          >
            <Button
              type={'button'}
              variant={pathname === tab.path ? 'secondary' : 'ghost'}
              className={'w-full justify-start'}
            >
              <FontAwesomeIcon
                icon={tab.icon}
                className={'mr-2'}
              />
              {tab.label}
            </Button>
          </Link>
        ))}
      </div>
      <div className={'sm:w-4/5'}>{children}</div>
    </div>
  )
}

export default ApplyProfileLayout
