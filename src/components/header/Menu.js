'use client'

import { forwardRef } from 'react'
import Link from 'next/link'
import { cn } from '@/utils/shadcn'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { routes } from '@/utils/routes'

const Menu = () => {
  return (
    <div className={'hidden sm:block'}>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Get Involved</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className={'grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'}>
                <li className={'row-span-3'}>
                  <NavigationMenuLink asChild>
                    <Link
                      className={
                        'flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md hover:bg-muted/80 transition-all'
                      }
                      href={routes.get_involved.apply.href}
                    >
                      <FontAwesomeIcon
                        icon={routes.get_involved.apply.icon}
                        className={'text-6xl'}
                      />
                      <div className={'mb-2 mt-4 text-lg font-bold'}>
                        {routes.get_involved.apply.title}
                      </div>
                      <p className='text-sm leading-tight text-muted-foreground'>
                        {routes.get_involved.apply.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                {Object.entries(routes.get_involved).map(([key, value]) => {
                  if (key === 'apply') return null
                  return (
                    <ListItem
                      key={key}
                      title={value.title}
                      href={value.href}
                      icon={value.icon}
                    >
                      {value.description}
                    </ListItem>
                  )
                })}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Contribute</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className={'grid md:grid-cols-2 gap-3 p-4 md:w-[400px] lg:w-[500px]'}>
                {Object.entries(routes.contribute).map(([key, value]) => (
                  <ListItem
                    key={key}
                    title={value.title}
                    href={value.href}
                    icon={value.icon}
                  >
                    {value.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Follow Us</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className={'grid md:grid-cols-2 gap-3 p-4 md:w-[400px] lg:w-[500px]'}>
                {Object.entries(routes.follow).map(([key, value]) => (
                  <ListItem
                    key={key}
                    title={value.title}
                    href={value.href}
                    icon={value.icon}
                  >
                    {value.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = forwardRef(({ className, title, icon, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className={'text-sm font-medium leading-none'}>
            <FontAwesomeIcon
              icon={icon}
              className={'fa-fw mr-2'}
            />
            {title}
          </div>
          <p className={'line-clamp-2 text-sm leading-snug text-muted-foreground'}>{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})

export default Menu
