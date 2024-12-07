'use client'

import NumberInput from '../share/number-input'
import TextInput from '../share/text-input'

type SearchExtendProps = {
  initFollowers: number
  initForks: number
  initStars: number
  initLanguage: string
  onFollowersChange: (value: number) => void
  onForksChange: (value: number) => void
  onStarsChange: (value: number) => void
  onLanguageChange: (value: string) => void
}

export default function SearchExtend({
  initFollowers,
  initForks,
  initStars,
  initLanguage,
  onFollowersChange,
  onForksChange,
  onStarsChange,
  onLanguageChange,
}: SearchExtendProps) {
  return (
    <div className="p-3 flex flex-col md:flex-col items-center justify-center w-fit">
      <div className="flex gap-2 items-center justify-center rounded-lg w-fit">
        <NumberInput
          initValue={initFollowers}
          onChange={onFollowersChange}
          palceholder="followers"
          className="max-w-[100px]"
        />
        <NumberInput
          initValue={initForks}
          onChange={onForksChange}
          palceholder="forks"
          className="max-w-[100px]"
        />
        <NumberInput
          initValue={initStars}
          onChange={onStarsChange}
          palceholder="stars"
          className="max-w-[100px]"
        />
      </div>
      <div className="h-4" />
      <div className="flex flex-row items-center justify-center w-fit">
        <TextInput
          initValue={initLanguage}
          placeholder="Language"
          onChange={(value) => onLanguageChange(value)}
          className="max-w-[150px]"
        />
      </div>
    </div>
  )
}
