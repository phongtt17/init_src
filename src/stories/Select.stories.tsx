import { ComponentMeta, ComponentStory } from '@storybook/react';

import Input from '../components/Select';

export default {
  title: 'Example/Selected',
  component: Input,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  className: 'block w-52 px-4 py-2 mt-2 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40 form-multiselect',
  listOption: [{ id: 1, name: '2' }, { id: 2, name: '3' }],
};

export const ErrorSelect = Template.bind({});
ErrorSelect.args = {
  className: 'block w-52 px-4 py-2 mt-2 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40 form-multiselect',
  helperText: 'message is required',
  listOption: [{ id: 1, name: '2' }, { id: 2, name: '3' }],
  error: true
};