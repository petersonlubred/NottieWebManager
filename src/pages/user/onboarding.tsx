import React from 'react';

import SetupNewUserLoginForm from '@/components/onboard/NewUserLoginForm';
import Logo from '@/components/shared/Logo';
import Seo from '@/providers/seo';

import { Body, LogoContainer, Main, NavbarSection } from '..';

const Onboarding = () => {
  return (
    <Body>
      <Seo title="Home" />
      <Main>
        <NavbarSection>
          <LogoContainer>
            <Logo />
          </LogoContainer>
        </NavbarSection>
        <SetupNewUserLoginForm />
      </Main>
    </Body>
  );
};

export default Onboarding;
