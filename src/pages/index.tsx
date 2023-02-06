import type { NextPage } from 'next';
import styled from 'styled-components';
import Seo from '../providers/seo';
import { px } from '../utils/px/px';
import Logo from '@/components/Logo';
import SetDatabase from '@/components/SetDatabase';
import Signin from '@/components/SignIn';
import { useState } from 'react';
import SetDatabaseForm from '@/components/SetDatabaseForm/SetDatabaseForm';
import SetupProcess from '@/components/SetupProcess/SetupProcess';
import SetUpSuccess from '@/components/SetupSuccess/SetUpSuccess';

const Home: NextPage = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [step, setStep] = useState(0);

  const toggleLogin = () => {
    setIsLogin(false);
    setStep(step + 1);
  };

  const handleSetStep = () => {
    setStep(step + 1);
  };

  return (
    <Body>
      <Seo title="Home" />
      <Main>
        <NavbarSection>
          <LogoContainer>
            <Logo />
          </LogoContainer>
          {isLogin && step === 0 && <SetDatabase toggleLogin={toggleLogin} />}
        </NavbarSection>
        {step === 0 ? (
          <Signin handleSetStep={handleSetStep} />
        ) : step == 1 ? (
          <SetDatabaseForm handleSetStep={handleSetStep} />
        ) : step === 2 ? (
          <SetupProcess handleSetStep={handleSetStep} />
        ) : (
          step === 3 && <SetUpSuccess handleSetStep={handleSetStep} />
        )}
      </Main>
    </Body>
  );
};

//TODO: sticky doesn't work with overflow
const Body = styled.div``;
const Main = styled.main`
  /* overflow: hidden; */
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  min-height: 100vh;
  ${({ theme }) => theme.media.md} {
    min-height: ${px(650)};
  }
  ${({ theme }) => theme.media.lg} {
    min-height: ${px(800)};
  }
`;

const LogoContainer = styled.div`
  margin-top: ${px(34)};
  cursor: pointer;
`;

const NavbarSection = styled.div`
  margin-left: ${px(62.2)};
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  ${({ theme }) => theme.media.md} {
    margin-top: ${px(40)};
    margin-left: ${px(80)};
  }
  ${({ theme }) => theme.media.lg} {
    margin-top: ${px(50)};
    margin-left: ${px(100)};
  }
`;

export default Home;
