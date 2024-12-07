import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import ResultCard from '../result-card'

export default {
  title: 'Components/Search/ResultCard',
  component: ResultCard,
} as Meta

const Template: StoryFn = () => (
  <ResultCard
    imgUrl="https://avatars.githubusercontent.com/u/20925?v=4"
    name="meme"
    describe="meme is a meme coin"
    followers={10}
    stars={10}
    forks={10}
    onCardClick={() => console.log('card clicked')}
  />
)

export const Default = Template.bind({})
