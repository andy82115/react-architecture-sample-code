import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import ExtendToggle from '../extend-toggle'

export default {
  title: 'Components/Share/ExtendToggle',
  component: ExtendToggle,
} as Meta

const Template: StoryFn = (args) => {
  return <ExtendToggle {...args} isExtendInit={false} onToggle={() => {}} />
}

export const Default = Template.bind({})
