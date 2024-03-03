import React, { ButtonHTMLAttributes } from 'react';

export default function NormalButton({
  type = 'button',
  children,
  ...rest
}: Readonly<ButtonHTMLAttributes<HTMLButtonElement>>): React.ReactElement {
  return (
    <button type={type} {...rest}>
      {children}
    </button>
  );
}
