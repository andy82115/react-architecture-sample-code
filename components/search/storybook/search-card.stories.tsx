import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import SearchCard from '../search-card'
import { createNewSearchParam } from '@/src/app/search/model/search-parameter'

export default {
  title: 'Components/Search/SearchCard',
  component: SearchCard,
  argTypes: {
    isCardTransform: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
  },
} as Meta

const Template: StoryFn = (args) => (
  <SearchCard
    initExtendValue={false}
    isCardTransform={args.isCardTransform}
    queryFilter={createNewSearchParam().queryFilter}
    onExtendToggle={() => {}}
    onFollowerChange={() => {}}
    onInWhereChange={() => {}}
    onStarsChange={() => {}}
    onLanguageChange={() => {}}
    onForksChange={() => {}}
    onKeywordChange={() => {}}
  />
)

export const Default = Template.bind({})
