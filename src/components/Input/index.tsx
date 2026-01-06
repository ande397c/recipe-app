import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, ...inputProps }: InputProps) => {
  return (
    <>
      {label && (
        <label className='block' htmlFor={inputProps.name}>
          {label}
        </label>
      )}
      <input
        {...inputProps}
        className={clsx('w-full h-8 rounded-md pl-2', {
          'text-logoColor': !error,
          'border-1 border-danger text-danger': error
        })}
      />
      {error && <span className='text-danger text-sm'>{error}</span>}
    </>
  );
};
