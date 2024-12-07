'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const pushSearchPage = () => {
    router.push(`/search`)
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Button
        className="w-fit h-fit"
        onClick={() => {
          pushSearchPage()
        }}
      >
        Goooooo Search Repository
      </Button>
    </div>
  )
}
