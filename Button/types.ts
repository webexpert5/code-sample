import React, { ReactNode } from 'react';

export type Variant =
  | 'contained'
  | 'outlined'
  | 'transparent'
  | 'dashed'
  | 'dark';

export type Color =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark';

export type Shape = 'square' | 'round';

export type Size = 'xsmall' | 'small' | 'medium' | 'large';

type ButtonBaseProps = {
  children?: ReactNode;
  variant?: Variant;
  color?: Color;
  shape?: Shape;
  size?: Size;
  fullWidth?: boolean;
  disabled?: boolean;
  startIcon?: string;
  endIcon?: string;
  className?: string;
};

export type NormalButtonProps = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    component: 'button';
  };

export type LinkButtonProps = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    component: 'a';
  };

export type ButtonProps = NormalButtonProps | LinkButtonProps;
