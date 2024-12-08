'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Routes } from './util/router/routes'
import { motion } from 'framer-motion'

export default function Home() {
  const router = useRouter()

  const pushSearchPage = () => {
    router.push(Routes.SEARCH)
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-black">
      <motion.button
        className="w-fit h-fit px-20 py-5 text-2xl text-black bg-blue-200 font-semibold hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-500 rounded-full"
        onClick={() => {
          pushSearchPage()
        }}
        whileHover={{
          scale: 1.5,
          transition: { type: 'spring', stiffness: 300, damping: 20 }
        }}
        whileTap={{
          scale: 0.95,
        }}
      >
        <motion.div
          variants={{ hover: { scale: 0.85 }, press: { scale: 1.1 } }}
        >
          Start
        </motion.div>
        
      </motion.button>
    </div>
  )
}
