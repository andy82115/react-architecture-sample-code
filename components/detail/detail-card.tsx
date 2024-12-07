'use client'

import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, Star, PersonStanding, GitFork, CircleDot } from 'lucide-react'
import LabelIcon from '../share/label-icon'

type ResultCardProps = {
  imgUrl: string
  repoName: string
  owner: string
  language: string
  describe: string
  followers: number
  stars: number
  forks: number
  issue: number
}

export default function DetailCard({
  imgUrl,
  repoName,
  owner,
  language,
  describe,
  stars,
  followers,
  forks,
  issue,
}: ResultCardProps) {
  return (
    <Card className="w-fit px-3 py-3 flex flex-col md:flex-col bg-white dark:bg-gray-800 text-black dark:text-white shadow-md dark:shadow-lg">
      <CardContent className="p-0 flex flex-col md:flex-row items-center justify-center w-fit">
        <Avatar className="mx-3">
          <AvatarImage src={imgUrl} alt="Ｘ" />
          <AvatarFallback>
            <User className="h-[1.2rem] w-[1.2rem]" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col md:flex-row w-full py-6 items-center justify-between">
          <div className="flex flex-col w-fit items-start justify-start">
            <Label className="text-lg text-black dark:text-white">
              repo name: {repoName}
            </Label>
            <div className="w-3 h-3" />
            <Label className="text-lg text-black dark:text-white">
              owner: {owner}
            </Label>
            <div className="w-3 h-3" />
            <Label className="text-lg text-black dark:text-white">
              language: {language}
            </Label>
            <div className="w-3 h-3" />
            <Label className="text-lg text-black dark:text-white">
              description: {describe}
            </Label>
          </div>
          <div className="w-3 h-3" />
          <div className="flex flex-row md:flex-col items-center justify-center w-fit">
            <LabelIcon text={followers.toString()} Icon={PersonStanding} />
            <div className="w-3 h-3" />
            <LabelIcon text={stars.toString()} Icon={Star} />
            <div className="w-3 h-3" />
            <LabelIcon text={forks.toString()} Icon={GitFork} />
            <div className="w-3 h-3" />
            <LabelIcon text={issue.toString()} Icon={CircleDot} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
