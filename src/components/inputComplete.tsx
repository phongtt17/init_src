import { ChangeEvent, FC, LegacyRef, ReactNode, useState } from 'react';

import useOnClickOutside from '@/hooks/clickOutSide';

type Props = {
  classNameInput?: string;
  contentOptions: ReactNode;
  refInput: React.MutableRefObject<HTMLElement | null>;
  classWidth?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const AutoComplete: FC<Props> = ({ classNameInput, contentOptions, refInput, classWidth, onChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  useOnClickOutside(refInput, () => {
    setShowDropdown(false);
  });
  return (
    <div className="relative">
      <input onChange={(e) => onChange(e)} className={classNameInput} placeholder="Search" onClick={() => setShowDropdown(!showDropdown)} />
      {showDropdown && (
        <div
          onClick={() => setShowDropdown(false)}
          ref={refInput as LegacyRef<HTMLInputElement>}
          className={`absolute mt-1 bg-white rounded-md shadow-lg ${classWidth} max-h-60 overflow-y-auto	`}
        >
          {contentOptions}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
