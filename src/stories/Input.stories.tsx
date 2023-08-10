import { ComponentMeta, ComponentStory } from '@storybook/react';

import Input from '../components/Input';

export default {
  title: 'Example/Input',
  component: Input,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  className: 'form-input block w-50 px-4 py-2 mt-2 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40',
  type: 'text',
};

export const ErrorInput = Template.bind({});
ErrorInput.args = {
  className: 'form-input block w-50 px-4 py-2 mt-2 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40',
  type: 'text',
  helperText: 'message is required',
  error: true,
};
