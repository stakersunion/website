'use client'

import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLoader,
  faHandHoldingHeart,
  faSignPost,
  faNetworkWired,
  faShieldAlt,
  faBalanceScale,
  faUsers,
  faLightbulb,
  faUserGraduate,
  faEye,
} from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/light'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNotify } from '@/utils/query/send'

const Pledge = () => {
  const { mutateAsync: notify, isPending: loadingNotify, isSuccess: successNotify } = useNotify()

  const formSchema = z.object({
    name: z.string().min(1, 'Please provide your name'),
    organization: z.string().min(1, 'Please provide your organization name'),
    email: z.string().email('Invalid email address'),
    pledge: z.boolean().refine((value) => value === true, {
      message: 'Pledge must be true',
    }),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      organization: '',
      email: '',
      pledge: false,
    },
  })

  const onSubmit = async (values) => {
    await notify({
      name: 'Tom Fadial',
      title: 'New Pledge',
      email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
      subject: 'New Pledge',
      content: `
          Name: ${values.name}
          Organization: ${values.organization}
          Email: ${values.email}
          Pledge: ${values.pledge}
        `,
    })
  }

  const benefits = [
    {
      title: 'Support Decentralization',
      description:
        'By committing to the Stakers Union, you actively contribute to maintaining and enhancing the decentralization of the Ethereum network, which is crucial for its security and resilience.',
      icon: faNetworkWired,
    },
    {
      title: 'Enhance Network Security',
      description:
        'Decentralized validators reduce the risk of centralization attacks and single points of failure, thereby strengthening the overall security of the Ethereum blockchain broadly and by extension your Ethereum-based protocol.',
      icon: faShieldAlt,
    },
    {
      title: 'Promote Credible Neutrality',
      description:
        "Supporting solo-stakers helps ensure that no single entity has undue influence over the network, preserving Ethereum's principle of credible neutrality.",
      icon: faBalanceScale,
    },
    {
      title: 'Encourage Diversity',
      description:
        'Client diversity is just one part of the equation, the Stakers Union fosters a diverse validator ecosystem by supporting solo-stakers operating different clients on varied hardware across multiple jurisdictions, which is essential for a robust network.',
      icon: faUsers,
    },
    {
      title: 'Boost Innovation',
      description:
        'Solo-stakers often experiment with new technologies and methodologies, contributing to the overall innovation within the Ethereum ecosystem. Your support can help accelerate these advancements.',
      icon: faLightbulb,
    },
    {
      title: 'Ethereum Alignment',
      description:
        'Taking the pledge aligns you with a community of dedicated Ethereum supporters and validators, enhancing your reputation within the ecosystem as a contributor to its long-term health and success.',
      icon: faEthereum,
    },
    {
      title: 'Access to Expertise',
      description:
        'By partnering with the Stakers Union, you gain access to a pool of experienced solo-stakers who can provide valuable feedback on staking tools and technologies, helping you improve your products.',
      icon: faUserGraduate,
    },
    {
      title: 'Long-term Vision',
      description:
        'Supporting the Stakers Union demonstrates a commitment to the long-term sustainability and growth of the Ethereum network, which can positively impact the value and utility of Ethereum-based projects and tokens.',
      icon: faEye,
    },
  ]
  return (
    <div className={'pb-10'}>
      <div className={'flex flex-col md:flex-row md:items-center'}>
        <div className={'flex-1'}>
          <h1 className={'text-4xl font-bold'}>Take the Pledge</h1>
          <p className={'text-lg text-muted-foreground mb-2'}>
            Give back, support decentralization
          </p>
        </div>
        <div className={'flex mt-4 md:mt-0 md:ml-4 gap-x-4'}>
          <Link href={'#'}>
            <Button>
              <FontAwesomeIcon
                icon={faSignPost}
                className={'mr-2'}
              />
              Read More
            </Button>
          </Link>
          <Link href={'#pledge'}>
            <Button>
              <FontAwesomeIcon
                icon={faHandHoldingHeart}
                className={'mr-2'}
              />
              Take The Pledge
            </Button>
          </Link>
        </div>
      </div>
      <Separator className={'my-6'} />
      <div>
        <h2 className={'text-2xl font-bold mb-4'}>It's a big ask</h2>
        <p className={'text-lg text-muted-foreground'}>
          We know, but here it is: like the{' '}
          <Link
            href={'https://tim.mirror.xyz/srVdVopOFhD_ZoRDR50x8n5wmW3aRJIrNEAkpyQ4_ng'}
            className={'underline underline-offset-2 hover:text-foreground transition-all'}
          >
            Protocol Guild
          </Link>
          , we’re asking for your support in committing a portion (any portion) of your protocol’s
          token or revenue to the Stakers Union.
        </p>

        <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-8'}>
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={'p-6 rounded-md group hover:bg-foreground hover:text-black transition-all'}
            >
              <div className={'flex items-center'}>
                <FontAwesomeIcon
                  icon={benefit.icon}
                  className={'text-2xl mr-4'}
                />
                <h3 className={'text-xl font-bold'}>{benefit.title}</h3>
              </div>
              <p className={'text-sm text-muted-foreground group-hover:text-background mt-2'}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <Separator className={'my-6'} />
        <div
          className={'mb-4'}
          id={'pledge'}
        >
          <h2 className={'text-2xl font-bold'}>Get in touch</h2>
          <p className={'text-lg text-muted-foreground'}>
            Thank you for your interest in taking the Stakers Union Pledge
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={'space-y-8'}
          >
            <FormField
              control={form.control}
              name={'name'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={'John Smith'}
                      {...field}
                    />
                  </FormControl>
                  <div className={'flex'}>
                    <FormDescription className={'text-xs'}>
                      Your public display name.
                    </FormDescription>
                    <FormMessage className={'ml-2 text-xs text-red-500'} />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'organization'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={'ACME Corp'}
                      {...field}
                    />
                  </FormControl>
                  <div className={'flex'}>
                    <FormDescription className={'text-xs'}>
                      Your organization or project name.
                    </FormDescription>
                    <FormMessage className={'ml-2 text-xs text-red-500'} />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'email'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={'test@example.com'}
                      {...field}
                    />
                  </FormControl>
                  <div className={'flex'}>
                    <FormDescription className={'text-xs'}>
                      Your preferred contact email.
                    </FormDescription>
                    <FormMessage className={'ml-2 text-xs text-red-500'} />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'pledge'}
              render={({ field }) => (
                <FormItem>
                  <div className={'flex items-center space-x-2'}>
                    <Checkbox
                      id={'pledge'}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <div className={'flex items-center'}>
                      <label
                        htmlFor={'pledge'}
                        className={'text-sm'}
                      >
                        I pledge to support the Stakers Union
                      </label>
                      <FormMessage className={'ml-2 text-xs text-red-500'} />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <div className={'my-4'}>
              <Button disabled={loadingNotify}>
                {loadingNotify ? (
                  <FontAwesomeIcon
                    icon={faLoader}
                    className={'animate-spin mr-2'}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faHandHoldingHeart}
                    className={'mr-2'}
                  />
                )}
                Take the Pledge
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Pledge
