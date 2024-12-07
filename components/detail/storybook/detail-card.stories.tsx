import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import DetailCard from '../detail-card'

export default {
  title: 'Components/Search/DetailCard',
  component: DetailCard,
} as Meta

const Template: StoryFn = () => (
  <DetailCard
    imgUrl="https://avatars.githubusercontent.com/u/20925?v=4"
    repoName='golang/rust'
    owner="meme"
    describe="meme is a meme coin"
    language='GoRust coin'
    followers={10}
    stars={10}
    forks={10}
    issue={10}
  />
)

export const Default = Template.bind({})
