import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import NumberInput from '../number-input'

export default {
  title: 'Components/Share/NumberInput',
  component: NumberInput,
} as Meta

const Template: StoryFn = () => (
  <NumberInput
    initValue={0}
    palceholder='input number'
    onChange={() => {}}
  />
)

export const Default = Template.bind({})
