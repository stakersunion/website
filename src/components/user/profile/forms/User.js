'use client'

import { useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  contactMethodOptions,
  languageOptions,
  osOptions,
  toolingOptions,
} from '@/components/user/profile/forms/options'
import { X } from 'lucide-react'

const labelMap = (options) =>
  options.reduce((acc, option) => {
    acc[option.value] = option.label
    return acc
  }, {})

const languageLabelMap = labelMap(languageOptions)
const contactLabelMap = labelMap(contactMethodOptions)
const toolingLabelMap = labelMap(toolingOptions)

const MultiSelectDropdown = ({ label, options, values = [], onChange, disabled }) => {
  const selectedLabels = useMemo(
    () =>
      options
        .filter((option) => values.includes(option.value))
        .map((option) => option.label)
        .join(', '),
    [options, values]
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type={'button'}
          variant={'outline'}
          disabled={disabled}
          className={'w-full justify-between font-normal'}
        >
          <span className={'truncate'}>
            {selectedLabels || `Select ${label.toLowerCase()}`}
          </span>
          <span className={'text-xs text-muted-foreground'}>{values.length}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={'w-72'}>
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={values.includes(option.value)}
            onCheckedChange={(checked) => {
              const next = checked
                ? Array.from(new Set([...values, option.value]))
                : values.filter((value) => value !== option.value)
              onChange(next)
            }}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const TokenListEditor = ({
  values = [],
  onChange,
  inputValue,
  setInputValue,
  placeholder,
  disabled,
}) => {
  const addValue = () => {
    const nextValue = inputValue.trim()
    if (!nextValue) return

    const exists = values.some((value) => value.toLowerCase() === nextValue.toLowerCase())
    if (exists) {
      setInputValue('')
      return
    }

    onChange([...values, nextValue])
    setInputValue('')
  }

  return (
    <div className={'space-y-2'}>
      <div className={'flex gap-2'}>
        <Input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              addValue()
            }
          }}
        />
        <Button
          type={'button'}
          variant={'outline'}
          onClick={addValue}
          disabled={disabled}
        >
          Add
        </Button>
      </div>
      <div className={'flex flex-wrap gap-2'}>
        {values.map((value) => (
          <Badge
            key={value}
            variant={'outline'}
            className={'flex items-center gap-2'}
          >
            <span>{value}</span>
            <button
              type={'button'}
              aria-label={`Remove ${value}`}
              className={'rounded p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground'}
              onClick={() => onChange(values.filter((item) => item !== value))}
              disabled={disabled}
            >
              <X className={'h-3 w-3'} />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  )
}

const RemovableChips = ({ items, onRemove }) => {
  if (!items || items.length === 0) return null

  return (
    <div className={'flex flex-wrap gap-2 pt-1'}>
      {items.map((item) => (
        <Badge
          key={item.value}
          variant={'outline'}
          className={'flex items-center gap-2'}
        >
          <span>{item.label}</span>
          <button
            type={'button'}
            aria-label={`Remove ${item.label}`}
            className={'rounded p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground'}
            onClick={() => onRemove(item.value)}
          >
            <X className={'h-3 w-3'} />
          </button>
        </Badge>
      ))}
    </div>
  )
}

const User = ({ form, isLoading }) => {
  const [customLanguage, setCustomLanguage] = useState('')
  const [customTooling, setCustomTooling] = useState('')
  const selectedContactMethods = form.watch('preferredContact.methods') || []
  const selectedOs = form.watch('stack.os')

  const additionalHandleFields = [
    { key: 'telegram', label: 'Telegram Handle', placeholder: '@username' },
    { key: 'signal', label: 'Signal', placeholder: 'Signal username or number' },
    { key: 'whatsapp', label: 'WhatsApp', placeholder: '+1...' },
  ]

  return (
    <div className={'space-y-8'}>
      <div className={'columns-1 md:columns-2 gap-x-6 space-y-6'}>
        <FormField
          control={form.control}
          name={'name'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input
                  placeholder={'John Smith'}
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <div className={'flex'}>
                <FormDescription className={'text-xs'}>Your public display name.</FormDescription>
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
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <div className={'flex'}>
                <FormDescription className={'text-xs'}>
                  Your preferred contact email used for notifications. Use an anonymous service!
                </FormDescription>
                <FormMessage className={'ml-2 text-xs text-red-500'} />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className={'columns-1 md:columns-2 gap-x-6 space-y-6'}>
        <FormField
          control={form.control}
          name={'discord'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discord</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <div className={'flex'}>
                <FormDescription className={'text-xs'}>
                  Your Discord handle, used to provide members-only access.
                </FormDescription>
                <FormMessage className={'ml-2 text-xs text-red-500'} />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'withdrawalAddress'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Withdrawal Address</FormLabel>
              <FormControl>
                <Input
                  placeholder={'0x...'}
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <div className={'flex'}>
                <FormDescription className={'text-xs'}>
                  The ETH address used to distribute incentives.
                </FormDescription>
                <FormMessage className={'ml-2 text-xs text-red-500'} />
              </div>
            </FormItem>
          )}
        />
      </div>

      <div className={'space-y-6'}>
        <FormField
          control={form.control}
          name={'languages.common'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Languages</FormLabel>
              <FormControl>
                <MultiSelectDropdown
                  label={'Languages'}
                  options={languageOptions}
                  values={field.value || []}
                  onChange={(nextValues) => {
                    field.onChange(nextValues)
                    if (!nextValues.includes('other')) {
                      form.setValue('languages.custom', [], {
                        shouldDirty: true,
                        shouldValidate: true,
                      })
                    }
                  }}
                  disabled={isLoading}
                />
              </FormControl>
              <RemovableChips
                items={[
                  ...(field.value || []).map((value) => ({
                    value: `language:${value}`,
                    label: languageLabelMap[value] || value,
                  })),
                  ...((form.watch('languages.custom') || []).map((value) => ({
                    value: `language_custom:${value}`,
                    label: value,
                  })) || []),
                ]}
                onRemove={(chipValue) => {
                  if (chipValue.startsWith('language_custom:')) {
                    const token = chipValue.replace('language_custom:', '')
                    const nextCustom = (form.getValues('languages.custom') || []).filter(
                      (value) => value !== token
                    )
                    form.setValue('languages.custom', nextCustom, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                    return
                  }

                  const token = chipValue.replace('language:', '')
                  const nextSelected = (field.value || []).filter((value) => value !== token)
                  field.onChange(nextSelected)
                  if (token === 'other') {
                    form.setValue('languages.custom', [], {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }
                }}
              />
              {(field.value || []).includes('other') && (
                <div className={'pt-2'}>
                  <TokenListEditor
                    values={form.watch('languages.custom') || []}
                    onChange={(next) =>
                      form.setValue('languages.custom', next, {
                        shouldDirty: true,
                        shouldValidate: true,
                      })
                    }
                    inputValue={customLanguage}
                    setInputValue={setCustomLanguage}
                    placeholder={'Add a language not listed above'}
                    disabled={isLoading}
                  />
                </div>
              )}
              <div className={'flex'}>
                <FormDescription className={'text-xs'}>
                  Select all languages you can use for member coordination. Choose Other to add a
                  custom entry.
                </FormDescription>
                <FormMessage className={'ml-2 text-xs text-red-500'} />
              </div>
            </FormItem>
          )}
        />
      </div>

      <div className={'space-y-6'}>
        <FormField
          control={form.control}
          name={'preferredContact.methods'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Contact Method</FormLabel>
              <FormControl>
                <MultiSelectDropdown
                  label={'Contact Methods'}
                  options={contactMethodOptions}
                  values={field.value || []}
                  onChange={(nextValues) => {
                    const removedValues = (field.value || []).filter(
                      (value) => !nextValues.includes(value)
                    )
                    removedValues.forEach((method) => {
                      if (['telegram', 'signal', 'whatsapp'].includes(method)) {
                        form.setValue(`preferredContact.handles.${method}`, '', {
                          shouldDirty: true,
                          shouldValidate: true,
                        })
                      }
                    })
                    field.onChange(nextValues)
                  }}
                  disabled={isLoading}
                />
              </FormControl>
              <RemovableChips
                items={(field.value || []).map((value) => ({
                  value,
                  label: contactLabelMap[value] || value,
                }))}
                onRemove={(method) => {
                  const nextValues = (field.value || []).filter((value) => value !== method)
                  if (['telegram', 'signal', 'whatsapp'].includes(method)) {
                    form.setValue(`preferredContact.handles.${method}`, '', {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }
                  field.onChange(nextValues)
                }}
              />
              <FormDescription className={'text-xs'}>
                Email and Discord use the fields above. Add handles below for any other selected
                channels.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {additionalHandleFields
          .filter((handle) => selectedContactMethods.includes(handle.key))
          .map((handle) => (
            <FormField
              key={handle.key}
              control={form.control}
              name={`preferredContact.handles.${handle.key}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{handle.label}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={handle.placeholder}
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
      </div>

      <div className={'space-y-6'}>
        <FormField
          control={form.control}
          name={'stack.os'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Operating System</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || undefined}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={'Select an OS'} />
                  </SelectTrigger>
                  <SelectContent>
                    {osOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedOs === 'other' && (
          <FormField
            control={form.control}
            name={'stack.osOther'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>OS (Other)</FormLabel>
                <FormControl>
                  <Input
                    placeholder={'Describe your OS'}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name={'stack.tooling'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tooling</FormLabel>
              <FormControl>
                <MultiSelectDropdown
                  label={'Tooling'}
                  options={toolingOptions}
                  values={field.value || []}
                  onChange={(nextValues) => {
                    field.onChange(nextValues)
                    if (!nextValues.includes('other')) {
                      form.setValue('stack.toolingCustom', [], {
                        shouldDirty: true,
                        shouldValidate: true,
                      })
                    }
                  }}
                  disabled={isLoading}
                />
              </FormControl>
              <RemovableChips
                items={[
                  ...(field.value || []).map((value) => ({
                    value: `tooling:${value}`,
                    label: toolingLabelMap[value] || value,
                  })),
                  ...((form.watch('stack.toolingCustom') || []).map((value) => ({
                    value: `tooling_custom:${value}`,
                    label: value,
                  })) || []),
                ]}
                onRemove={(chipValue) => {
                  if (chipValue.startsWith('tooling_custom:')) {
                    const token = chipValue.replace('tooling_custom:', '')
                    const nextCustom = (form.getValues('stack.toolingCustom') || []).filter(
                      (value) => value !== token
                    )
                    form.setValue('stack.toolingCustom', nextCustom, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                    return
                  }

                  const token = chipValue.replace('tooling:', '')
                  const nextSelected = (field.value || []).filter((value) => value !== token)
                  field.onChange(nextSelected)
                  if (token === 'other') {
                    form.setValue('stack.toolingCustom', [], {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }
                }}
              />
              {(field.value || []).includes('other') && (
                <div className={'pt-2'}>
                  <TokenListEditor
                    values={form.watch('stack.toolingCustom') || []}
                    onChange={(next) =>
                      form.setValue('stack.toolingCustom', next, {
                        shouldDirty: true,
                        shouldValidate: true,
                      })
                    }
                    inputValue={customTooling}
                    setInputValue={setCustomTooling}
                    placeholder={'Add custom tooling (e.g. custom ansible stack)'}
                    disabled={isLoading}
                  />
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <p className={'text-xs text-muted-foreground'}>
          Select tooling you use. Choose Other to add custom tooling entries.
        </p>
      </div>
    </div>
  )
}

export default User
