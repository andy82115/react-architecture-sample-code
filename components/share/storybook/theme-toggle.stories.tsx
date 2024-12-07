import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { ThemeToggle } from '../theme-toggle'

export default {
  title: 'Components/Share/ThemeToggle',
  component: ThemeToggle,
} as Meta

const Template: StoryFn = () => {
  return <ThemeToggle />;
}

export const Default = Template.bind({});
