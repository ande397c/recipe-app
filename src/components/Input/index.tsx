import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, ...inputProps }: InputProps) => {
  return (
    <div className='max-h-9'>
      {label && (
        <label className='block text-sm' htmlFor={inputProps.name}>
          {label}
        </label>
      )}
      <input
        {...inputProps}
        className={clsx(
          'w-full h-8 rounded-md pl-2 bg-white border border-muted text-heading text-sm rounded-base focus:ring-brand focus:border-brand block px-3 py-2.5 shadow-sm',
          {
            'text-logoColor': !error,
            'border-1 border-danger text-danger': error
          }
        )}
      />
      {error && <span className='text-danger text-sm'>{error}</span>}
    </div>
  );
};
