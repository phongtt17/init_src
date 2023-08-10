import { Fragment, LegacyRef, SelectHTMLAttributes, forwardRef } from 'react';

type IListOption = {
  id: number;
  name: string;
};

interface ISelected extends SelectHTMLAttributes<HTMLElement> {
  listOption?: IListOption[];
  error?: boolean;
  helperText?: string | boolean;
}

const SelectCustom = forwardRef((props: ISelected, ref?: LegacyRef<HTMLSelectElement>) => {
  return (
    <Fragment>
      <select
        ref={ref}
        className={`${props?.className}` + `${!!props?.error ? ' border-red-700' : ' border-zinc-200'} form-control`}
        onChange={props?.onChange}
        name={props?.name}
        placeholder={props?.placeholder}
        value={props.value}
      >
        {props?.listOption?.map(({ name, id }) => {
          return (
            <Fragment key={id}>
              <option value={0}></option>
              <option value={id}>{name}</option>
            </Fragment>
          );
        })}
      </select>
      {!!props?.error && <div className="error-message">{!!props?.error && props?.helperText}</div>}
    </Fragment>
  );
});

export default SelectCustom;
