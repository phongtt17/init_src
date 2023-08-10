import { Fragment, InputHTMLAttributes, LegacyRef, forwardRef } from 'react';

import './Input.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
}

const InputForward = forwardRef((props?: InputProps, ref?: LegacyRef<HTMLInputElement>): JSX.Element => {
  return (
    <Fragment>
      <input
        type={props?.type}
        ref={ref}
        className={`${props?.className}` + `${!!props?.error ? ' border-red-700' : ' border-zinc-200'} form-control`}
        onChange={props?.onChange}
        onBlur={props?.onBlur}
        name={props?.name}
        placeholder={props?.placeholder}
      ></input>
      {!!props?.error && <div className="error-message">{!!props?.error && props?.helperText}</div>}
    </Fragment>
  );
});

export default InputForward;
