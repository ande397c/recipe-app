import { FC, useRef, useState, useLayoutEffect } from 'react';

interface AutoExpandingTextareaProps {
  onCreateStep: (value: string) => void;
}

export const AutoExpandingTextarea: FC<AutoExpandingTextareaProps> = ({ onCreateStep }) => {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const resizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  useLayoutEffect(() => {
    resizeTextarea();
  }, [value]);

  const handleSubmit = () => {
    if (!value.trim()) return;

    onCreateStep(value.trim());
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <textarea
        ref={textareaRef}
        name='createStep'
        className='w-full resize-none overflow-hidden bg-white border border-muted text-sm rounded-md focus:ring-brand focus:border-brand block p-3.5 shadow-sm'
        rows={1}
        value={value}
        placeholder='Tilføj step'
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleSubmit}
      />
      <button type='submit' className='hidden' />
    </form>
  );
};
