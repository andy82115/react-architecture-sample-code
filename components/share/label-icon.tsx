'use client'

import { Label } from '@/components/ui/label'
import { LucideIcon } from 'lucide-react'

type LabelIconProps = {
  text: string
  Icon: LucideIcon
}

export default function LabelIcon({ text, Icon }: LabelIconProps) {
  return (
    <div className="flex flex-row items-center justify-center space-x-2">
      <Icon />
      <Label>{text}</Label>
    </div>
  )
}
