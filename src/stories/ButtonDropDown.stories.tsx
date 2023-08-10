import { ComponentMeta, ComponentStory } from '@storybook/react';

import { useRef } from 'react';

import InputAutoComple from '../components/ButtonDropDown';

import logo from '../assets/images/dashboard/multikart-logo.png';

export default {
  title: 'Example/ButtonDropDown',
  component: InputAutoComple,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof InputAutoComple>;

const Template: ComponentStory<typeof InputAutoComple> = (args) => {
  const inputRef = useRef(null);
  return <InputAutoComple {...args} refBtn={inputRef} />;
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
  classNameContainer: 'relative inline-block text-left',
  classNameButton:
    'flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 dark:border-gray-700 dark:text-white rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800',
  nameDefaultBtn: 'Options',
  listOption: [
    { id: 1, name: 'abc' },
    { id: 2, name: 'tuan' },
  ],
};
