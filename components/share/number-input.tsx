'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'

type NumberInputProps = {
  initValue: number
  palceholder?: string
  className?: string
  onChange: (value: number) => void
}

// * input number should bigger than 0
// * 入力数値は0より大きくなければならない
export default function NumberInput({
  className,
  palceholder = '',
  onChange,
  initValue,
}: NumberInputProps) {
  const [value, setValue] = useState(
    initValue === 0 ? '' : initValue.toString(),
  )

  const handleInputChange = (ele: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = ele.target.value

    const numericValue = rawValue ? Number(rawValue) : 0

    setValue(numericValue === 0 ? '' : numericValue.toString())
    onChange(numericValue)
  }

  return (
    <div
      className={`p-0 bg-white dark:bg-gray-800 rounded-lg items-center justify-center ${className}`}
    >
      <Input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder={palceholder}
        value={value}
        onChange={handleInputChange}
        className="p-2 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 w-full"
      />
    </div>
  )
}
