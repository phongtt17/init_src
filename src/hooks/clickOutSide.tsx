import { useEffect } from 'react';

const useOnClickOutside = (ref: React.MutableRefObject<HTMLElement | null>, handler: (e: Event) => void): void => {
  useEffect(() => {
    const listener = (event: Event): void => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
