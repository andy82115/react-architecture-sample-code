import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import SearchCard from '../search-card'
import { createNewSearchParam } from '@/src/app/search/model/search-parameter'

export default {
  title: 'Components/Search/SearchCard',
  component: SearchCard,
} as Meta

const Template: StoryFn = () => (
  <SearchCard
    initExtendValue={false}
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
// Default.args = {
//     label: 'Click Me',
//     onClick: () => alert('Button clicked!'),
// };
