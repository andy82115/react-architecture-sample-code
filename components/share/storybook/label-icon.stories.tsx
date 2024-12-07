import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import LabelIcon from '../label-icon'
import { Sun } from 'lucide-react'

export default {
  title: 'Components/Share/LabelIcon',
  component: LabelIcon,
} as Meta

const Template: StoryFn = () => <LabelIcon text="labeltest" Icon={Sun} />

export const Default = Template.bind({})
