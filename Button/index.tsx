import React from 'react';
import classNames from 'classnames';
import Icon from '@/common/components/Icon';
import NormalButton from './NormalButton';
import LinkButton from './LinkButton';
import type {
  ButtonProps,
  NormalButtonProps,
  LinkButtonProps,
  Color,
  Variant,
  Shape,
  Size,
} from './types';

const Button: React.FC<ButtonProps> = ({
  component = 'button',
  variant = 'contained',
  color = 'primary',
  shape = 'square',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  startIcon,
  endIcon,
  className,
  children,
  ...buttonProps
}) => {
  const variantClasses = {
    contained: '',
    outlined: 'border bg-transparent border-box',
    dashed: 'border bg-transparent border-dashed',
    transparent: 'bg-transparent',
    dark: 'bg-dark text-light',
  };

  const sizeClasses = {
    xsmall: 'h-5 px-5 text-xs font-medium',
    small: 'py-2 px-5 h-10 text-sm font-medium',
    medium: 'py-2.5 px-5 h-11 text-base font-medium',
    large: 'h-8 px-6 text-base font-medium',
  };

  const shapeClasses = {
    round: 'rounded-full',
    square: 'rounded-lg',
  };

  const widthClasses = {
    wFit: 'w-fit',
    wFull: 'w-full',
  };

  const cursorClasses = {
    pointer: 'cursor-pointer',
    disabled: 'cursor-not-allowed !bg-neutral-200',
  };

  const iconSizes = {
    xsmall: 16,
    small: 24,
    medium: 24,
    large: 28,
  };

  const getVariantStyles = (color: Color, variant: Variant) => {
    const isContainedVariant = variant === 'contained';
    const isOutlinedVariant = variant === 'outlined';
    const isDarkVariant = variant === 'dark';

    return classNames({
      'border-primary-600 lg:hover:bg-primary-400': color === 'primary',
      'bg-primary-600': color === 'primary' && isContainedVariant,
      'border-secondary-500 lg:hover:bg-secondary-400': color === 'secondary',
      'bg-secondary-700': color === 'secondary' && isContainedVariant,
      'border-neutral-400 lg:hover:bg-neutral-200': color === 'neutral',
      'bg-neutral-400': color === 'neutral' && isContainedVariant,
      'border-success-400 lg:hover:bg-success-300': color === 'success',
      'bg-success-400': color === 'success' && isContainedVariant,
      'border-danger-300 lg:hover:bg-danger-200': color === 'danger',
      'bg-danger-300': color === 'danger' && isContainedVariant,
      'border-warning-300 lg:hover:bg-warning-200': color === 'warning',
      'bg-warning-300': color === 'warning' && isContainedVariant,
      'lg:hover:bg-dark/80': isDarkVariant,
      'border-neutral-200': color === 'dark',
      'text-neutral-400': color === 'dark' && isOutlinedVariant,
      'border-white lg:hover:bg-white/20 transition-colors': color === 'light',
      'bg-white': color === 'light' && isContainedVariant,
    });
  };

  const rootClasses = classNames([
    'btn flex items-center justify-center no-underline gap-2',
    widthClasses[fullWidth ? 'wFull' : 'wFit'],
    sizeClasses[size],
    variantClasses[variant],
    getVariantStyles(color, variant),
    shapeClasses[shape],
    cursorClasses[disabled ? 'disabled' : 'pointer'],
    className,
  ]);

  const innerContent = (
    <>
      {startIcon && (
        <span data-test="button-icon-start" className="">
          <Icon
            icon={startIcon}
            height={iconSizes[size]}
            width={iconSizes[size]}
          />
        </span>
      )}
      {children && <span>{children}</span>}
      {endIcon && (
        <span data-test="button-icon-end">
          <Icon
            icon={endIcon}
            height={iconSizes[size]}
            width={iconSizes[size]}
          />
        </span>
      )}
    </>
  );

  if (component === 'a') {
    return (
      <LinkButton className={rootClasses} {...(buttonProps as LinkButtonProps)}>
        {innerContent}
      </LinkButton>
    );
  } else {
    return (
      <NormalButton
        disabled={disabled}
        className={rootClasses}
        {...(buttonProps as NormalButtonProps)}
      >
        {innerContent}
      </NormalButton>
    );
  }
};

export {
  ButtonProps,
  NormalButtonProps,
  LinkButtonProps,
  Variant,
  Color,
  Shape,
  Size,
};
export default Button;
