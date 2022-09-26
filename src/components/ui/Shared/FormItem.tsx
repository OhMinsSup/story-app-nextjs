import React from 'react';
import Label from './Label';
import classNames, { type Argument } from 'classnames';

export interface FormItemProps {
  className?: Argument;
  label?: string;
  desc?: React.ReactNode | string;
  children?: React.ReactNode;
}

const FormItem: React.FC<FormItemProps> = ({
  children,
  className,
  label,
  desc,
}) => {
  return (
    <div className={classNames(className)}>
      {label && <Label>{label}</Label>}
      <div className="mt-1.5">{children}</div>
      {desc && (
        <div className="block mt-3 text-xs text-neutral-500 dark:text-neutral-400">
          {desc}
        </div>
      )}
    </div>
  );
};

export default FormItem;
