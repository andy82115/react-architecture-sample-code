'use client'

import * as React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import RadioGroupRow from '../share/radio-group-row'
import RadioGroupRowIcon from '../share/radio-group-row-icon'
import TextInput from '../share/text-input'
import ExtendToggle from '../share/extend-toggle'
import ThemeToggle from '../share/theme-toggle'
import SearchExtend from './search-extend'
import { useState } from 'react'
import { InWhere } from '@/src/app/search/model/search-parameter'
import { QueryFilter } from '../../src/app/search/model/search-parameter'
import {
  LoaderPinwheel,
  BookMarkedIcon,
  ScrollText,
  Paperclip,
  IndentIncrease,
} from 'lucide-react'

type searchCardProps = {
  initExtendValue: boolean
  isCardTransform: boolean
  queryFilter: QueryFilter
  onExtendToggle: (isExtend: boolean) => void
  onKeywordChange: (keyword: string) => void
  onInWhereChange: (inWhere: InWhere) => void
  onFollowerChange: (follower: number) => void
  onStarsChange: (stars: number) => void
  onForksChange: (forks: number) => void
  onLanguageChange: (language: string) => void
}

export default function SearchCard({
  initExtendValue,
  isCardTransform,
  queryFilter,
  onExtendToggle,
  onKeywordChange,
  onInWhereChange,
  onFollowerChange,
  onStarsChange,
  onForksChange,
  onLanguageChange,
}: searchCardProps) {
  const [isExtend, setIsExtend] = useState(initExtendValue)

  const getInWhereIndex = Object.values(InWhere).indexOf(queryFilter.inWhere)
  const getInWhereByIndex = (index: number) => Object.values(InWhere)[index]

  return (
    <Card className="w-fit px-10 py-6 flex flex-col md:px-30 md:flex-col bg-white dark:bg-gray-800 text-black dark:text-white shadow-md dark:shadow-lg">
      {/* Make Card smaller when transform */}
      {!isCardTransform && (
        <CardHeader className="flex items-center justify-center w-full">
          <CardTitle className="text-center text-6xl">
            Search Repository
          </CardTitle>
        </CardHeader>
      )}

      {!isCardTransform ? (
        <CardContent className="flex flex-col md:flex-col items-center justify-center w-fit">
          <RadioGroupRow
            options={Object.values(InWhere)}
            initIndex={getInWhereIndex}
            onSelected={(value) => {
              onInWhereChange(getInWhereByIndex(value))
            }}
          />
          <div className="flex flex-row md:flex-row items-center justify-center w-full">
            <TextInput
              initValue={queryFilter.keyword}
              placeholder="Search by keyword"
              onChange={(value) => onKeywordChange(value)}
              className="w-full"
            />
            <div className="w-2" />
            <ExtendToggle
              isExtendInit={initExtendValue}
              onToggle={(isExtend) => {
                onExtendToggle(isExtend)
                setIsExtend(isExtend)
              }}
            />
            <div className="w-2" />
            <ThemeToggle></ThemeToggle>
          </div>

          {isExtend && (
            <div className="mt-4 border p-4 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-500">
              <SearchExtend
                initFollowers={queryFilter.followers}
                initStars={queryFilter.stars}
                initForks={queryFilter.forks}
                initLanguage={queryFilter.language}
                onFollowersChange={onFollowerChange}
                onStarsChange={onStarsChange}
                onForksChange={onForksChange}
                onLanguageChange={onLanguageChange}
              />
            </div>
          )}
        </CardContent>
      ) : (
        <CardContent className="flex flex-col p-0 md:flex-row items-center justify-center w-fit">
          <RadioGroupRowIcon
            icons={[
              LoaderPinwheel,
              BookMarkedIcon,
              ScrollText,
              Paperclip,
              IndentIncrease,
            ]}
            initIndex={getInWhereIndex}
            onSelected={(value) => {
              onInWhereChange(getInWhereByIndex(value))
            }}
          />

          <div className="flex flex-row md:flex-row items-center justify-center w-fit">
            <TextInput
              initValue={queryFilter.keyword}
              placeholder="Search by keyword"
              onChange={(value) => onKeywordChange(value)}
              className="w-fit"
            />
            <div className="w-2" />
            <ThemeToggle></ThemeToggle>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
