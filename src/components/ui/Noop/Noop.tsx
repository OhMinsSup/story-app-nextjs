import React from 'react';

const Noop: React.FC<React.PropsWithChildren<any>> = ({
  children,
  ...props
}) => {
  const component = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, props);
    }
    return child;
  });
  return component;
};

export default Noop;
