import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import TextInput from '../text-input'

export default {
  title: 'Components/Share/TextInput',
  component: TextInput,
} as Meta

const Template: StoryFn = () => (
  <TextInput initValue={''} placeholder={'input text'} onChange={() => {}} />
)

export const Default = Template.bind({})
