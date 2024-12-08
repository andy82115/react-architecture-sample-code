'use client'

import { Button } from '@/components/ui/button'
import { Plus, Minus } from 'lucide-react'
import { useState } from 'react'

type ExtendToggleProps = {
  isExtendInit: boolean
  onToggle: (isExtend: boolean) => void
}

export default function ExtendToggle({
  isExtendInit = false,
  onToggle = () => {},
}: ExtendToggleProps) {
  const [isExtend, setIsExtend] = useState(isExtendInit)

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        onToggle(!isExtend)
        setIsExtend(!isExtend)
      }}
    >
      {isExtend ? (
        <Minus className="h-[1rem] w-[1rem]" />
      ) : (
        <Plus className="h-[1rem] w-[1rem]" />
      )}
      <span className="sr-only">Extend Toggle</span>
    </Button>
  )
}
