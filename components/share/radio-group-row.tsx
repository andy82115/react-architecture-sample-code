'use client'

import React, { useState } from 'react'
import { RadioGroup } from '@/components/ui/radio-group'

type RadioGroupProps = {
  initIndex: number
  options: string[]
  onSelected: (index: number) => void
}

export default function RadioGroupRow({
  options,
  initIndex,
  onSelected,
}: RadioGroupProps) {
  const [selectedValue, setSelectedValue] = useState(options[initIndex])

  return (
    <div className=" dark:bg-gray-800 rounded-lg w-fit">
      <RadioGroup
        value={selectedValue}
        onValueChange={setSelectedValue}
        className="flex space-x-2 min-w-max p-3"
      >
        {options.map((value, index) => (
          <button
            key={value}
            className={`p-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 relative overflow-hidden whitespace-nowrap
                ${
                  selectedValue === value
                    ? 'bg-blue-500 text-white dark:bg-blue-700'
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
                }`}
            onClick={() => {
              setSelectedValue(value)
              onSelected(index)
            }}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </button>
        ))}
      </RadioGroup>
    </div>
  )
}
