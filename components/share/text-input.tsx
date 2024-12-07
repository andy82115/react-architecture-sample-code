"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"

type InputProps = {
  initValue: string,
  placeholder: string,
  onChange: (value: string) => void,
  className?: string,
}

// * input text only allow A-Z 0-9 and space input
// * input textは、A-Z 0-9とスペースのみ入力可能
export default function TextInput({ initValue, placeholder, className, onChange }: InputProps) {
  const [text, setText] = useState(initValue)

  const handleInputChange = (ele: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[a-zA-Z0-9 ]*$/
    if (regex.test(ele.target.value)) {
      setText(ele.target.value)
    }

    onChange(ele.target.value)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg w-full">
      <Input
        type="text"
        placeholder= {placeholder}
        value={text}
        onChange={handleInputChange}
        className={`p-3 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${className}`}
      />
    </div>
  )
}