import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { Button } from 'flowbite-react';

import Popover from '@/components/Popover';

export default {
  title: 'Example/Popover',
  component: Popover,
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => (
  <div className='w-32'>
    <Popover {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  content: <div>sadas</div>,
  className: 'left-28',
  style: 'dark',
  placement: 'bottom',
  children: <Button>Hover me</Button>,
};
