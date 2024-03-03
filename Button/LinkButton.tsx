import React, { AnchorHTMLAttributes } from 'react';

export default function LinkButton(
  props: Readonly<AnchorHTMLAttributes<HTMLAnchorElement>>,
): React.ReactElement {
  const { children, ...rest } = props;
  return <a {...rest}>{children}</a>;
}
