import { css,cx } from '@emotion/css';
import React, { forwardRef,PropsWithChildren, Ref } from 'react';
import ReactDOM from 'react-dom';

interface BaseProps {
  className: string;
  [key: string]: unknown;
}
type OrNull<T> = T | null;

export const Button = forwardRef<
  OrNull<HTMLSpanElement>,
  PropsWithChildren<
    {
      active: boolean;
      reversed: boolean;
    } & BaseProps
  >
>(({ className, active, reversed, ...props }, ref) => (
  <span
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        cursor: pointer;
        color: ${reversed
          ? active
            ? 'white'
            : '#aaa'
          : active
          ? 'black'
          : '#ccc'};
      `
    )}
  />
));

Button.displayName = 'Button';

export const EditorValue = forwardRef<
  OrNull<null>,
  PropsWithChildren<
    {
      value: any;
    } & BaseProps
  >
>(({ className, value, ...props }, ref) => {
  const textLines = value.document.nodes
    .map((node: any) => node.text)
    .toArray()
    .join('\n');
  return (
    <div
      ref={ref}
      {...props}
      className={cx(
        className,
        css`
          margin: 30px -20px 0;
        `
      )}
    >
      <div
        className={css`
          font-size: 14px;
          padding: 5px 20px;
          color: #404040;
          border-top: 2px solid #eeeeee;
          background: #f8f8f8;
        `}
      >
        Slate&apos;s value as text
      </div>
      <div
        className={css`
          color: #404040;
          font: 12px monospace;
          white-space: pre-wrap;
          padding: 10px 20px;
          div {
            margin: 0 0 0.5em;
          }
        `}
      >
        {textLines}
      </div>
    </div>
  );
});

EditorValue.displayName = 'EditorValue';

export const Icon = forwardRef<
  OrNull<HTMLSpanElement>,
  PropsWithChildren<BaseProps>
>(({ className, ...props }, ref) => (
  <span
    {...props}
    ref={ref}
    className={cx(
      'material-icons',
      className,
      css`
        font-size: 18px;
        vertical-align: text-bottom;
      `
    )}
  />
));

Icon.displayName = 'Icon';

export const Instruction = forwardRef<
  OrNull<HTMLDivElement>,
  PropsWithChildren<BaseProps>
>(({ className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        white-space: pre-wrap;
        margin: 0 -20px 10px;
        padding: 10px 20px;
        font-size: 14px;
        background: #f8f8e8;
      `
    )}
  />
));

Instruction.displayName = 'Instruction';

export const Menu = forwardRef<
  OrNull<HTMLDivElement>,
  PropsWithChildren<BaseProps>
>(({ className, ...props }, ref) => (
  <div
    {...props}
    data-test-id="menu"
    ref={ref}
    className={cx(
      className,
      css`
        & > * {
          display: inline-block;
        }
        & > * + * {
          margin-left: 15px;
        }
      `
    )}
  />
));

Menu.displayName = 'Menu';

export const Portal = ({ children }: PropsWithChildren) => {
  return typeof document === 'object'
    ? ReactDOM.createPortal(children, document.body)
    : null;
};

export const Toolbar = forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <Menu
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          position: relative;
          padding: 1px 18px 17px;
          margin: 0 -20px;
          border-bottom: 2px solid #eee;
          margin-bottom: 20px;
        `
      )}
    />
  )
);

Portal.displayName = 'Portal';
Toolbar.displayName = 'Toolbar';
