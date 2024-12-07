'use client'

import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, Star, PersonStanding, GitFork } from 'lucide-react'
import LabelIcon from '../share/label-icon'

type ResultCardProps = {
  imgUrl: string
  name: string
  describe: string
  followers: number
  stars: number
  forks: number
  onCardClick: () => void
}

export default function ResultCard({
  imgUrl,
  name,
  describe,
  stars,
  followers,
  forks,
  onCardClick,
}: ResultCardProps) {
  return (
    <Card
      className="w-full px-3 py-3 flex flex-col md:px-30 md:flex-col bg-white dark:bg-gray-800 text-black dark:text-white shadow-md dark:shadow-lg"
      onClick={onCardClick}
    >
      <CardContent className="p-0 flex flex-col md:flex-row items-center justify-center w-full">
        <Avatar className="mx-3">
          <AvatarImage src={imgUrl} alt="Ｘ" />
          <AvatarFallback>
            <User className="h-[1.2rem] w-[1.2rem]" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col md:flex-row w-full py-6 items-center justify-between">
          {/* describe & repository name */}
          <div className="flex flex-col md:flex-row w-fit items-center justify-center">
            <Label className="text-lg text-black dark:text-white">{name}</Label>
            <div className="w-3 h-3" />
            <Label className="text-sm text-gray-500">{describe}</Label>
          </div>
          {/* space */}
          <div className="w-3 h-3" />
          {/* LabelIcons, followers, forks, stars */}
          <div className="flex flex-row items-center justify-center w-fit">
            <LabelIcon text={followers.toString()} Icon={PersonStanding} />
            <div className="w-3 h-3" />
            <LabelIcon text={stars.toString()} Icon={Star} />
            <div className="w-3 h-3" />
            <LabelIcon text={forks.toString()} Icon={GitFork} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
