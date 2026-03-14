import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './select';
import { cn } from '@/libs/utils';

interface SelectInputProps<T extends string | Record<string, unknown>> {
  placeholder?: string;
  name: string;
  selected: string;
  className?: string;
  options: T[];
  keyPropertyName?: T extends Record<string, unknown> ? keyof T : never;
  itemPropertyName?: T extends Record<string, unknown> ? keyof T : never;
  valuePropertyName?: T extends Record<string, unknown> ? keyof T : never;
  disabled?: boolean;
  required?: boolean;
  onChange?: (value: string) => void;
}

export function SelectInput<T extends string | Record<string, unknown>>({
  placeholder,
  selected,
  options,
  keyPropertyName,
  itemPropertyName,
  valuePropertyName,
  disabled,
  required,
  className,
  name,
  onChange,
}: SelectInputProps<T>) {
  return (
    <Select
      disabled={disabled}
      onValueChange={onChange}
      required={required}
      name={name}
    >
      <SelectTrigger className={cn('w-[180px]', className)}>
        <SelectValue placeholder={selected || placeholder} className='gap-3' />
      </SelectTrigger>
      <SelectContent className=''>
        <SelectGroup>
          <SelectLabel>{placeholder}</SelectLabel>
          {options.map((item, idx) => {
            // Check if item is a string
            if (typeof item === 'string') {
              return (
                <SelectItem
                  key={idx}
                  value={item}
                  className='whitespace-break-spaces'
                >
                  {item}
                </SelectItem>
              );
            }

            // If item is an object
            const key = keyPropertyName
              ? String((item as Record<string, unknown>)[keyPropertyName])
              : idx;
            const value = valuePropertyName
              ? String((item as Record<string, unknown>)[valuePropertyName])
              : String(item);
            const displayText = itemPropertyName
              ? String((item as Record<string, unknown>)[itemPropertyName])
              : String(item);

            return (
              <SelectItem
                key={key}
                value={value}
                className='whitespace-break-spaces'
              >
                {displayText}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
