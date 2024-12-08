'use client'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Armchair } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Routes } from './util/router/routes'

export default function NotFoundPage() {
  const router = useRouter()

  const pushToHome = () => {
    router.push(`${Routes.HOME}`)
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Label className="text-lg text-black dark:text-white break-all">
        404 error!!! Go Home Page~
      </Label>
      <div className="w-6 h-6"></div>
      <Armchair size={50} onClick={pushToHome} />
    </div>
  )
}
