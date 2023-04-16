import React from 'react';

import SetupNewUserLoginForm from '@/components/onboard/NewUserLoginForm';
import Logo from '@/components/shared/Logo';
import AuthRoute from '@/HOC/AuthRoute';
import Seo from '@/providers/seo';

import { Body, LogoContainer, Main, NavbarSection } from '..';

const Onboarding = () => {
  return (
    <AuthRoute isPublic>
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
    </AuthRoute>
  );
};

export default Onboarding;
