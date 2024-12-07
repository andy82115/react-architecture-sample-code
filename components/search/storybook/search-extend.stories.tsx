import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import SearchExtend from '../search-extend'

export default {
  title: 'Components/Search/SearchExtend',
  component: SearchExtend,
} as Meta

const Template: StoryFn = () => (
  <SearchExtend
    initFollowers={10}
    initForks={0}
    initStars={3}
    initLanguage={'golang'}
    onFollowersChange={(value: number) => {}}
    onForksChange={(value: number) => {}}
    onStarsChange={(value: number) => {}}
    onLanguageChange={(value: string) => {}}
  />
)

export const Default = Template.bind({})
