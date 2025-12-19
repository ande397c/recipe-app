// import { useRef } from 'react'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import clsx from 'clsx';
import { useRef } from 'react';
// import { useOutsideClick } from '@hooks/useOutsideClick'

interface BaseModalProps {
  showModal: boolean;
  title: string;
  size?: 'sm' | 'md' | 'lg';
  enableClickOutside?: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

export const BaseModal = ({
  showModal,
  title,
  size = 'sm',
  enableClickOutside = true,
  children,
  onClose
}: BaseModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick({ ref: modalRef, enabled: enableClickOutside, callback: onClose });

  if (!showModal) {
    return null;
  }

  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div
          className={clsx({
            'relative mb-[9rem] mx-auto w-full min-w-[20rem]': true,
            'w-2/5 max-w-lg': size === 'sm',
            'w-3/5 max-w-xl': size === 'md',
            'w-3/4 max-w-3xl': size === 'lg'
          })}
          ref={modalRef}
        >
          <div className='rounded-md shadow-lg relative flex flex-col gap-1.5 w-full bg-white outline-none focus:outline-none p-5'>
            <div className='flex items-center justify-center flex-col pb-0'>
              <button onClick={onClose} className='absolute top-2 right-4'>
                <FontAwesomeIcon icon={faXmark} size='lg' />
              </button>
            </div>
            <h3 className='text-2xl font-semibold text-left'>{title}</h3>
            <div className='mb-6'>{children}</div>
          </div>
        </div>
      </div>
      <div className='fixed inset-0 z-40 bg-black opacity-65'></div>
    </>
  );
};

interface BaseModalActionsProps {
  children?: React.ReactNode;
}

const Actions = ({ children }: BaseModalActionsProps) => {
  return <div className='flex justify-center flex-col sm:flex-row gap-2 mt-6'>{children}</div>;
};

BaseModal.Actions = Actions;
