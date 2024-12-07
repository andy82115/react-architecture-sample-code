import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import RadioGroupRow from '../radio-group-row'

export default {
  title: 'Components/Share/RadioGroupRow',
  component: RadioGroupRow,
} as Meta

const Template: StoryFn = () => (
  <RadioGroupRow
    options={['a', 'b', 'c', 'd', 'e']}
    initIndex={0}
    onSelected={(index) => console.log(index)}
  />
)

export const Default = Template.bind({})
