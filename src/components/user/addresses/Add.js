import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { useAddAddress } from '@/utils/query/user/address'

const Add = ({ buttonClassName = 'self-end' }) => {
  const [open, setOpen] = useState(false)
  const { mutateAsync: addAddress, isPending, isSuccess, error } = useAddAddress()

  const addressTypes = [
    { value: 'deposit', label: 'Deposit' },
    { value: 'withdrawal', label: 'Withdrawal' },
    { value: 'fee-recipient', label: 'Fee Recipient' },
    { value: 'passport', label: 'Passport' },
    { value: 'other', label: 'Other' },
  ]

  const formSchema = z.object({
    signature: z
      .string()
      .url()
      .refine((value) => value.startsWith('https://etherscan.io/verifySig'), {
        message: 'The URL must start with https://etherscan.io/verifySig',
      }),
    type: z.enum(
      addressTypes.map((type) => type.value),
      {
        message: 'Address type is required',
      }
    ),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      signature: '',
      type: '',
    },
  })

  const onSubmit = async (values) => {
    try {
      await addAddress(values)
      form.reset()
      toast.success('Address added')
      setOpen(false)
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
      <SheetTrigger asChild>
        <Button className={buttonClassName}>
          <FontAwesomeIcon
            icon={faPlus}
            className={'mr-2'}
          />
          Add Address
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Address</SheetTitle>
          <SheetDescription>
            Validate ownership of additional addresses for other Stakers Union purposes.
          </SheetDescription>
        </SheetHeader>
        <div className={'text-sm text-muted-foreground'}>
          <Separator className={'my-6'} />
          <h3 className={'font-bold text-foreground'}>Instructions</h3>
          <ol className={'mt-2 ml-4 list-decimal'}>
            <li>
              <Link
                target={'_blank'}
                className={'underline underline-offset-2 hover:no-underline'}
                href={'https://docs.stakersunion.com/membership/verification/signing'}
              >
                Sign a message
              </Link>{' '}
              containing the{' '}
              <span
                className={'cursor-pointer underline underline-offset-2 hover:no-underline'}
                onClick={() => {
                  navigator.clipboard.writeText(`Night gathers, and now my stake begins.
It shall not end until my final block.
I shall hold no memes, bear no greed and claim no fame.
I shall live and die at my node.
I am the validator in the shadows.
I am the watcher on the chains.
I am the shield that guards against corruption, the fire that fuels the network, the light that maintains transparency, the horn that calls to the honest.
I pledge my code and commitment to Ethereum, for this epoch and all the epochs to come.`)
                  toast.success('Oath copied to clipboard')
                }}
              >
                Stakers Union Oath
              </span>
            </li>
            <li>
              Submit the URL of your{' '}
              <Link
                target={'_blank'}
                className={'underline underline-offset-2 hover:no-underline'}
                href={'https://etherscan.io/verifiedSignatures#'}
              >
                Etherscan Verified Signature
              </Link>
            </li>
          </ol>
          <Separator className={'my-6'} />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={'space-y-4'}
          >
            <FormField
              control={form.control}
              name={'signature'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Etherscan Verified Signature</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={'https://...'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'type'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={'Select a Type'} />
                      </SelectTrigger>
                      <SelectContent>
                        {addressTypes.map((type) => (
                          <SelectItem
                            key={type.value}
                            value={type.value}
                          >
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className={'pt-4'}>
              <Button
                type={'button'}
                disabled={isPending}
                onClick={form.handleSubmit(onSubmit)}
              >
                {isPending && (
                  <FontAwesomeIcon
                    icon={faLoader}
                    className={'mr-2 h-4 w-4 animate-spin'}
                  />
                )}
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}

export default Add
