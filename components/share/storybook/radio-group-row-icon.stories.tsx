import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import RadioGroupRowIcon from '../radio-group-row-icon'
import {
  LoaderPinwheel,
  BookMarkedIcon,
  ScrollText,
  Paperclip,
  IndentIncrease,
} from 'lucide-react'

export default {
  title: 'Components/Share/RadioGroupRowIcon',
  component: RadioGroupRowIcon,
} as Meta

const Template: StoryFn = () => (
  <RadioGroupRowIcon
    icons={[
      LoaderPinwheel,
      BookMarkedIcon,
      ScrollText,
      Paperclip,
      IndentIncrease,
    ]}
    initIndex={0}
    onSelected={(index) => console.log(index)}
  />
)

export const Default = Template.bind({})
