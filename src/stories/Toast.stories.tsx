import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import Toast from '@/components/Toast';

export default {
  title: 'Example/Toast',
  component: Toast,
} as ComponentMeta<typeof Toast>;

const Template: ComponentStory<typeof Toast> = (args) => <Toast {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  message: 'This is a toast',
  type: 'success',
  show: true,
};
