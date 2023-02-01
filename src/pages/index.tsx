import type { NextPage } from 'next';
import styled from 'styled-components';
import Seo from '../components/seo';
import { px } from '../utils/px/px';
import Logo from '@/components/Logo';
import SetDatabase from '@/components/SetDatabase';
import Signin from '@/components/SignIn';
import { useState } from 'react';
import SetDatabaseForm from '@/components/SetDatabaseForm/SetDatabaseForm';
import SetupProcess from '@/components/SetupProcess/SetupProcess';

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
          <Logo />
          {isLogin && <SetDatabase toggleLogin={toggleLogin} />}
        </NavbarSection>
        {step === 0 ? (
          <Signin handleSetStep={handleSetStep} />
        ) : step == 1 ? (
          <SetDatabaseForm handleSetStep={handleSetStep} />
        ) : (
          step === 2 && <SetupProcess />
        )}
      </Main>
    </Body>
  );
};

//TODO: sticky doesn't work with overflow
const Body = styled.div``;
const Main = styled.main`
  /* overflow: hidden; */
  background-color: ${({ theme }) => theme.colors.darkPrimary};
  min-height: 100vh;
  ${({ theme }) => theme.media.md} {
    min-height: ${px(650)};
  }
  ${({ theme }) => theme.media.lg} {
    min-height: ${px(800)};
  }
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
