import { UseFormRegisterReturn } from 'react-hook-form';

interface TextAreaProps {
  label?: string;
  name?: string;
  register?: UseFormRegisterReturn;
  [key: string]: any;
}

export default function TextArea({ register, label, name, ...rest }: TextAreaProps) {
  return (
    <div className='mb-2'>
      {label ? (
        <label htmlFor={name} className='mt-2 mb-1 block text-sm font-medium text-gray-700'>
          {label}
        </label>
      ) : null}
      <textarea
        {...register}
        id={name}
        className='mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 '
        rows={4}
        {...rest}
      />
    </div>
  );
}
