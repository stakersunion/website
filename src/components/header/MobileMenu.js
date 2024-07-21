import { forwardRef } from 'react'
import Link from 'next/link'
import { cn } from '@/utils/shadcn'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { routes } from '@/utils/routes'

const MobileMenu = () => {
  return (
    <div className={'sm:hidden'}>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size={'icon'}
            variant={'outline'}
          >
            <FontAwesomeIcon
              icon={faBars}
              className={'w-5 h-5'}
            />
            <span className={'sr-only'}>Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side={'left'}
          className={'pr-0 pb-0'}
        >
          <SheetHeader>
            <SheetTitle className={'sr-only'}>Navigation</SheetTitle>
            <SheetDescription className={'sr-only'}>
              Navigation menu for small screens
            </SheetDescription>
          </SheetHeader>
          <nav className={'grid gap-6 font-medium flex-grow h-full'}>
            <ScrollArea className={'pr-6 pb-6'}>
              <div>
                <h3 className={'font-semibold text-muted-foreground mb-2'}>Get Involved</h3>
                <ul className={'space-y-2'}>
                  {Object.entries(routes.get_involved).map(([key, value]) => (
                    <SheetItem
                      key={key}
                      title={value.title}
                      href={value.path}
                      icon={value.icon}
                      target={value.target}
                    >
                      {value.description}
                    </SheetItem>
                  ))}
                </ul>
              </div>
              <Separator className={'my-4'} />
              <div>
                <h3 className={'font-semibold text-muted-foreground mb-2'}>Contribute</h3>
                <ul className={'space-y-2'}>
                  {Object.entries(routes.contribute).map(([key, value]) => (
                    <SheetItem
                      key={key}
                      title={value.title}
                      href={value.path}
                      icon={value.icon}
                      target={value.target}
                    >
                      {value.description}
                    </SheetItem>
                  ))}
                </ul>
              </div>
              <Separator className={'my-4'} />
              <div>
                <h3 className={'font-semibold text-muted-foreground mb-2'}>Follow Us</h3>
                <ul className={'space-y-2'}>
                  {Object.entries(routes.follow).map(([key, value]) => (
                    <SheetItem
                      key={key}
                      title={value.title}
                      href={value.path}
                      icon={value.icon}
                      target={value.target}
                    >
                      {value.description}
                    </SheetItem>
                  ))}
                </ul>
              </div>
            </ScrollArea>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}

const SheetItem = forwardRef(({ className, title, icon, children, ...props }, ref) => {
  return (
    <li>
      <Link
        className={cn(
          'block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
          className
        )}
        {...props}
      >
        <div className={'text-xs font-medium leading-none'}>
          <FontAwesomeIcon
            icon={icon}
            className={'fa-fw mr-1'}
          />
          {title}
        </div>
        <p className={'line-clamp-2 text-xs leading-snug text-muted-foreground'}>{children}</p>
      </Link>
    </li>
  )
})

export default MobileMenu
