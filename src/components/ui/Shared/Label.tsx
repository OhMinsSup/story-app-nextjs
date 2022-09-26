import React from 'react';
import classNames from 'classnames';
import type { Argument } from 'classnames';

export interface LabelProps {
  className?: Argument;
  children?: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ className, children }) => {
  return (
    <label
      className={classNames(
        'text-base font-medium text-neutral-900',
        className,
      )}
    >
      {children}
    </label>
  );
};

export default Label;
