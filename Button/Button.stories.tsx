import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import fastCartesian from 'fast-cartesian';
import Button, { ButtonProps, Variant, Color, Shape, Size } from '.';

const colorOptions: Color[] = [
  'primary',
  'secondary',
  'neutral',
  'success',
  'warning',
  'danger',
];

const variantOption: Variant[] = [
  'contained',
  'outlined',
  'transparent',
  'dashed',
];

const sizeOptions: Size[] = ['xsmall', 'small', 'medium', 'large'];

const shapeOptions: Shape[] = ['square', 'round'];

const allVariationsDisabledArgs = {
  variant: {
    table: {
      disable: true,
    },
  },
  color: {
    table: {
      disable: true,
    },
  },
  size: {
    table: {
      disable: true,
    },
  },
  shape: {
    table: {
      disable: true,
    },
  },
};

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: { type: 'text' },
    },
    variant: {
      options: variantOption,
      control: { type: 'select' },
    },
    component: {
      options: ['a', 'button'],
      control: { type: 'select' },
    },
    color: {
      options: colorOptions,
      control: { type: 'select' },
      type: 'string',
    },
    shape: {
      options: shapeOptions,
      control: { type: 'select' },
    },
    size: {
      options: sizeOptions,
      control: { type: 'select' },
    },
    fullWidth: {
      control: { type: 'radio' },
      options: [true, false],
    },
    disabled: {
      control: { type: 'radio' },
      options: [true, false],
    },
    className: {
      control: { type: 'text' },
    },
    onClick: {
      action: 'clicked',
    },
    startIcon: {
      control: { type: 'text' },
    },
    endIcon: {
      control: { type: 'text' },
    },
  },
  args: {
    children: 'Button text',
  },
  parameters: {
    actions: {
      handles: ['mouseover', 'click'],
    },
  },
  render: (args) => (
    <div className="p-2">
      <Button {...args} />
    </div>
  ),
};

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const buttonElement = canvas.getByRole('button');

    await userEvent.click(buttonElement);
    expect(args.onClick).toHaveBeenCalled();
  },
};

export const ButtonWithNativeAttributes: Story = {
  args: {
    component: 'button',
    name: 'my-button',
    type: 'submit',
    value: 'my-value',
    form: 'my-form',
    disabled: false,
    className: 'test-class',
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const buttonElement = canvas.getByRole('button');

    await userEvent.click(buttonElement);
    expect(args.onClick).toHaveBeenCalled();
  },
};

export const LinkWithNativeAttributes: Story = {
  args: {
    component: 'a',
    className: 'test-class',
    href: 'https://proscore.soccer',
    target: '_blank',
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const buttonElement = canvas.getByRole('button');

    await userEvent.click(buttonElement);
    expect(args.onClick).toHaveBeenCalled();
    expect(buttonElement).toHaveAttribute('href', 'https://proscore.soccer');
  },
};

export const AllVariants: Story = {
  render: (args: ButtonProps) => {
    return (
      <div className="p-2">
        {variantOption.map((option) => (
          <>
            <Button variant={option} {...args}>
              {option} button
            </Button>
            <br />
          </>
        ))}
      </div>
    );
  },
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    variants: {
      enable: true,
    },
  },
};

export const AllColors: Story = {
  render: (args: ButtonProps) => {
    return (
      <div className="p-2">
        {colorOptions.map((option) => (
          <>
            <Button color={option} {...args}>
              {option} button
            </Button>
            <br />
          </>
        ))}
      </div>
    );
  },
  argTypes: {
    color: {
      table: {
        disable: true,
      },
    },
  },
};

export const AllSizes: Story = {
  render: (args: ButtonProps) => {
    return (
      <div className="p-2">
        {sizeOptions.map((option) => (
          <>
            <Button size={option} {...args}>
              {option} button
            </Button>
            <br />
          </>
        ))}
      </div>
    );
  },
  argTypes: {
    size: {
      table: {
        disable: true,
      },
    },
  },
};

export const AllShapes: Story = {
  render: (args: ButtonProps) => {
    return (
      <div className="p-2">
        {shapeOptions.map((option) => (
          <>
            <Button shape={option} {...args}>
              {option} button
            </Button>
            <br />
          </>
        ))}
      </div>
    );
  },
  argTypes: {
    size: {
      table: {
        disable: true,
      },
    },
  },
};

const renderAllVariations = (args: ButtonProps) => {
  const allVariations = fastCartesian([
    colorOptions,
    sizeOptions,
    shapeOptions,
  ]);
  return (
    <div className="grid grid-cols-8 gap-y-4 p-2">
      {allVariations.map((variation) => (
        <Button
          key={`contained-${variation[0]}-${variation[1]}-${variation[2]}`}
          variant="contained"
          color={variation[0]}
          size={variation[1]}
          shape={variation[2]}
          {...args}
        >
          Button
        </Button>
      ))}
    </div>
  );
};

// All variations template
export const AllVariations: Story = {
  render: (props) => renderAllVariations(props),
};

// All contained variant variations
export const VariantContained: Story = {
  render: (props) => renderAllVariations(props),
  args: {
    variant: 'contained',
  },
  argTypes: allVariationsDisabledArgs,
};

// All contained variant variations disabled
export const VariantContainedDisabled: Story = {
  render: (props) => renderAllVariations(props),
  args: {
    variant: 'contained',
    disabled: true,
  },
  argTypes: allVariationsDisabledArgs,
};

// All contained variant variations on hover
export const VariantContainedHover: Story = {
  render: (props) => renderAllVariations(props),
  args: {
    variant: 'contained',
  },
  argTypes: allVariationsDisabledArgs,
  parameters: {
    pseudo: { hover: true },
  },
};

// All outlined variant variations
export const VariantOutlined: Story = {
  render: (props) => renderAllVariations(props),
  args: {
    variant: 'outlined',
  },
  argTypes: allVariationsDisabledArgs,
};

// All outlined variant variations disabled
export const VariantOutlinedDisabled: Story = {
  render: (props) => renderAllVariations(props),
  args: {
    variant: 'outlined',
    disabled: true,
  },
  argTypes: allVariationsDisabledArgs,
};

// All outlined variant variations hover
export const VariantOutlinedHover: Story = {
  render: (props) => renderAllVariations(props),
  args: {
    variant: 'outlined',
  },
  argTypes: allVariationsDisabledArgs,
  parameters: {
    pseudo: { hover: true },
  },
};

// All dashed variant variations
export const VariantDashed: Story = {
  render: (props) => renderAllVariations(props),
  args: {
    variant: 'dashed',
  },
  argTypes: allVariationsDisabledArgs,
};

// All dashed variant variations disabled
export const VariantDashedDisabled: Story = {
  render: (props) => renderAllVariations(props),
  args: {
    variant: 'dashed',
    disabled: true,
  },
  argTypes: allVariationsDisabledArgs,
};

// All dashed variant variations hover
export const VariantDashedHover: Story = {
  render: (props) => renderAllVariations(props),
  args: {
    variant: 'dashed',
  },
  argTypes: allVariationsDisabledArgs,
  parameters: {
    pseudo: { hover: true },
  },
};

// All transparent variant variations
export const VariantTransparent: Story = {
  render: (props) => renderAllVariations(props),
  args: {
    variant: 'transparent',
  },
  argTypes: allVariationsDisabledArgs,
};

// All transparent variant variations disabled
export const VariantTransparentDisabled: Story = {
  render: (props) => renderAllVariations(props),
  args: {
    variant: 'transparent',
    disabled: true,
  },
  argTypes: allVariationsDisabledArgs,
};

// All transparent variant variations hover
export const VariantTransparentHover: Story = {
  render: (props) => renderAllVariations(props),
  args: {
    variant: 'transparent',
  },
  argTypes: allVariationsDisabledArgs,
  parameters: {
    pseudo: { hover: true },
  },
};

export const WithIcon: Story = {
  render: (args: ButtonProps) => {
    return (
      <div className="grid grid-cols-3 gap-y-4 p-2">
        <Button startIcon="eye" {...args}>
          Button
        </Button>
        <Button endIcon="eye" {...args}>
          Button
        </Button>
        <Button startIcon="eye" endIcon="eye" {...args}>
          Button
        </Button>
      </div>
    );
  },
};

export const FullWidth = {
  args: {
    variant: 'contained',
    size: 'large',
    fullWidth: true,
    endIcon: <FontAwesomeIcon icon={faSearch} />,
  },
};

export default meta;
