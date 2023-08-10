import {useRef, useState } from 'react';

import { TooltipProps } from 'flowbite-react';

import useOnClickOutside from '@/hooks/clickOutSide';

const Popover = ({ content, children, className }: TooltipProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (): void => {
    setIsOpen(!isOpen);
  };

  const buttonRef = useRef(null);
  useOnClickOutside(buttonRef, () => {
    setIsOpen(false);
  });

  return (
    <div className="relative" ref={buttonRef}>
      <div onClick={handleClick}>{children}</div>
      <div
        className={`absolute top-0 w-72 ${className} bg-white border border-gray-200 shadow-md rounded-md p-4 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 invisible'
        }`}
      >
        {content}
      </div>
      <div className={`absolute top-0 left-0 ${isOpen ? 'block' : 'hidden'} h-full`}></div>
    </div>
  );
};

// javascript:void(0)

export default Popover;
