import { useEffect } from 'react';

interface UseOutsideClickProps {
  ref: React.RefObject<HTMLDivElement | null>;
  enabled?: boolean;
  callback: () => void;
}

export const useOutsideClick = ({ ref, enabled = true, callback }: UseOutsideClickProps) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, enabled, callback]);
};
