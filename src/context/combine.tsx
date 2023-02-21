import React, { FC, PropsWithChildren } from 'react';

export const combineComponents = (...components: any[]): FC => {
  const WrapperComponent: FC = ({ children }: PropsWithChildren) => (
    <>{children}</>
  );
  return components.reduce((AccumulatedComponents, CurrentComponent) => {
    return function Wrapper({ children }: PropsWithChildren): JSX.Element {
      return (
        <AccumulatedComponents>
          <CurrentComponent>{children}</CurrentComponent>
        </AccumulatedComponents>
      );
    };
  }, WrapperComponent);
};
