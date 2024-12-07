'use client'

import React, { useState } from 'react'
import { RadioGroup } from '@/components/ui/radio-group'
import { LucideIcon } from 'lucide-react'

type RadioGroupProps = {
  initIndex: number
  icons: LucideIcon[]
  onSelected: (index: number) => void
}

export default function RadioGroupRowIcon({
  icons,
  initIndex,
  onSelected,
}: RadioGroupProps) {
  const [selectedValue, setSelectedValue] = useState(initIndex)

  return (
    <div className=" dark:bg-gray-800 rounded-lg w-9/10">
      <div className="overflow-x-auto scrollbar-hide">
        <RadioGroup
          value={selectedValue.toString()}
          onValueChange={(value) => {
            setSelectedValue(Number(value))
          }}
          className="flex space-x-2 min-w-max p-3"
        >
          {icons.map((IconComponent, index) => (
            <button
              key={index}
              className={`p-1 w-fit h-fit rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 relative overflow-hidden whitespace-nowrap
                ${
                  selectedValue === index
                    ? 'bg-blue-500 text-white dark:bg-blue-700'
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
                }`}
              onClick={() => {
                setSelectedValue(index)
                onSelected(index)
              }}
            >
              <IconComponent className="h-[1rem] w-[1rem]" />
            </button>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}
