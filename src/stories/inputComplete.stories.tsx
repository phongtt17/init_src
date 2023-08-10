import { ComponentMeta, ComponentStory } from '@storybook/react';

import { useRef } from 'react';

import InputAutoComple from '../components/inputComplete';

import logo from '../assets/images/dashboard/multikart-logo.png';

export default {
  title: 'Example/AutoComplete',
  component: InputAutoComple,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof InputAutoComple>;

const Template: ComponentStory<typeof InputAutoComple> = (args) => {
  const inputRef = useRef(null);
  return <InputAutoComple {...args} refInput={inputRef} />;
};

const contentAutoComplete = (
  <div className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer">
    <div className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer">
      <img src={logo} alt={''} className="h-8 w-8 object-cover rounded-full mr-2" />
      <span>image demo</span>
    </div>
  </div>
);

export const index = Template.bind({});
index.args = {
  classNameInput:
    'form-input block w-50 px-4 py-2 mt-2 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40',
  contentOptions: contentAutoComplete,
  classWidth: 'w-52',
};
