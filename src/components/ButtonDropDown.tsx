import { FC, LegacyRef, useCallback, useState } from 'react';

import { ISelectType } from '@/types/auth';
import useOnClickOutside from '@/hooks/clickOutSide';

type Props = {
  nameDefaultBtn?: string;
  classNameContainer?: string;
  classNameButton?: string;
  refBtn: React.MutableRefObject<HTMLElement | null>;
  listOption: ISelectType[];
  callback?: (id: number) => void;
};

const ButtonDropDown: FC<Props> = ({ classNameContainer, classNameButton, refBtn, listOption, nameDefaultBtn, callback }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [NewName, setName] = useState(nameDefaultBtn);

  const choiceName = useCallback((otherName: string, id: number) => {
    setName(otherName);
    callback && callback(id);
    setIsOpen(false);
  },[NewName] );

  useOnClickOutside(refBtn, () => {
    setIsOpen(false);
  });

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={classNameContainer}>
      <button
        type="button"
        className={classNameButton}
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={toggleDropdown}
      >
        {NewName}
        <svg aria-hidden="true" className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <div
        className={`${isOpen ? 'block' : 'hidden'} absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
        aria-labelledby="options-menu"
        role="menu"
      >
        <div className="py-1" role="none" ref={refBtn as LegacyRef<HTMLDivElement>}>
          {listOption.map(({ name, id }) => (
            <button
              key={id}
              type="button"
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={() => choiceName(name, id)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ButtonDropDown;
