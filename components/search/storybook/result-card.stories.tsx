import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import ResultCard from '../result-card'

export default {
  title: 'Components/Search/ResultCard',
  component: ResultCard,
  argTypes: {
    imgUrl: { control: 'text' },
    name: { control: 'text' },
    describe: { control: 'text' },
    followers: { control: 'number' },
    stars: { control: 'number' },
    forks: { control: 'number' },
    onCardClick: { action: 'clicked' },
  },
} as Meta

const Template: StoryFn = (args) => (
  <ResultCard
    imgUrl={args.imgUrl}
    name={args.name}
    describe={args.describe}
    followers={args.followers}
    stars={args.stars}
    forks={args.forks}
    onCardClick={args.onCardClick}
  />
)

export const Default = Template.bind({})
// Set initial values for controls
Default.args = {
  imgUrl: 'https://avatars.githubusercontent.com/u/20925?v=4',
  name: 'meme',
  describe: 'meme is a meme coin',
  followers: 10,
  stars: 10,
  forks: 10,
}
