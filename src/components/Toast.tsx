import React, { FC, Fragment } from 'react';

import { useRecoilState } from 'recoil';

import { toast } from '@/recoil/atom';

type Props = {
  message: string;
  type: string;
  show: boolean;
};

const Toast: FC<Props> = ({ message, type, show }) => {
  const [stateToast, setStateToast] = useRecoilState(toast);
  let backgroundColor;
  let textColor;

  const onClose = (): void => {
    setStateToast({ ...stateToast, show: false });
  };

  switch (type) {
    case 'success':
      backgroundColor = 'bg-green-500';
      textColor = 'text-white';
      break;
    case 'error':
      backgroundColor = 'bg-red-500';
      textColor = 'text-white';
      break;
    case 'warning':
      backgroundColor = 'bg-yellow-500';
      textColor = 'text-gray-800';
      break;
    default:
      backgroundColor = 'bg-gray-500';
      textColor = 'text-white';
      break;
  }
  return (
    <Fragment>
      <div
        className={`fixed right-0 m-4 p-4 rounded-lg ${backgroundColor} ${textColor} transition-opacity duration-300 ${
          show ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="font-bold">{type.toUpperCase()}:</span>
        <span className="ml-2">{message}</span>
        <button className="absolute top-0 right-1  text-sm font-bold text-white focus:outline-none" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </Fragment>
  );
};

export default Toast;
