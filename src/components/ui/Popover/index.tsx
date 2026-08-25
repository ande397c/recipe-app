import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: 'left' | 'right' | 'center';
  className?: string;
}

export const Popover: FC<PopoverProps> = ({ trigger, children, align = 'left', className }) => {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!popoverRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className='relative inline-block w-full' ref={popoverRef}>
      <button type='button' onClick={() => setOpen((prev) => !prev)} className='w-full'>
        {trigger}
      </button>

      {open && (
        <div
          className={clsx(
            'mt-2 rounded-md border bg-white shadow-md p-3',
            {
              'left-0': align === 'left',
              'right-0': align === 'right',
              'left-1/2 -translate-x-1/2': align === 'center'
            },
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};
