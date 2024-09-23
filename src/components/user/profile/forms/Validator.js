'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Location, executionOptions, consensusOptions } from '@/components/user/profile/forms'
import { useFieldArray } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const Validator = ({ form, isLoading }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'clients',
  })

  return (
    <div className={'flex flex-1 flex-col gap-6'}>
      {fields.map((item, index) => {
        return (
          <div
            className={'flex flex-col sm:flex-row gap-6'}
            key={`clients-field-${item.id}`}
          >
            <FormField
              control={form.control}
              name={`clients.${index}.execution`}
              render={({ field }) => {
                return (
                  <FormItem className={'flex flex-1 flex-col'}>
                    <FormLabel className={'my-1'}>
                      Execution Client {index !== 0 && `#${index + 1}`}
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={'Execution Client'} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {executionOptions.map((client) => (
                            <SelectItem
                              key={client.value}
                              value={client.value}
                            >
                              {client.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name={`clients.${index}.consensus`}
              render={({ field }) => (
                <FormItem className={'flex flex-1 flex-col'}>
                  <FormLabel className={'my-1'}>
                    Consensus Client {index !== 0 && `#${index + 1}`}
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={'Consensus Client'} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {consensusOptions.map((client) => (
                          <SelectItem
                            key={client.value}
                            value={client.value}
                          >
                            {client.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className={'sm:self-end flex gap-2 w-24'}>
              {index === fields.length - 1 && (
                <Button
                  type={'button'}
                  onClick={() => append({ execution: '', consensus: '' })}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <span className={'sm:hidden inline ml-2'}>Add</span>
                </Button>
              )}
              {fields.length > 1 && (
                <Button
                  type={'button'}
                  onClick={() => remove(index)}
                >
                  <FontAwesomeIcon icon={faMinus} />
                  <span className={'sm:hidden inline ml-2'}>Remove</span>
                </Button>
              )}
            </div>
          </div>
        )
      })}
      <div className={'flex flex-1 mt-6'}>
        <FormField
          control={form.control}
          name={'region'}
          render={({ field }) => (
            <Location
              field={field}
              isLoading={isLoading}
            />
          )}
        />
      </div>
    </div>
  )
}

export default Validator
