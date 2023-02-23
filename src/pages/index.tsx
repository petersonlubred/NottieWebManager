import SetupNewUserLoginForm from '@/components/onboard/NewUserLoginForm';
import SetDatabase from '@/components/onboard/SetDatabase';
import SetDatabaseForm from '@/components/onboard/SetDatabaseForm/SetDatabaseForm';
import SetupProcess from '@/components/onboard/SetupProcess/SetupProcess';
import SetUpSuccess from '@/components/onboard/SetupSuccess/SetUpSuccess';
import Signin from '@/components/onboard/SignIn';
import Logo from '@/components/shared/Logo';
import Toast from '@/components/shared/Notification/Toast';
import { useRegisterDbMutation } from '@/redux/services';
import { protectedRouteProps } from '@/utils/withSession';
import type { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import styled from 'styled-components';
import Seo from '../providers/seo';
import { px } from '../utils/px/px';

const Home: NextPage = () => {
  const [registerDb, { isLoading, isSuccess }] = useRegisterDbMutation();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [loginDetails, setLoginDetails] = useState<{
    username: string;
    password: string;
  }>({
    username: '',
    password: '',
  });

  const [step, setStep] = useState(1);

  const toggleLogin = () => {
    setIsLogin(false);
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
          {isLogin && <SetDatabase toggleLogin={toggleLogin} />}
        </NavbarSection>
        {isLogin ? (
          <Signin />
        ) : step == 1 ? (
          <SetDatabaseForm
            handleSetStep={handleSetStep}
            registerDb={registerDb}
            isLoading={isLoading}
          />
        ) : step === 2 ? (
          <SetupProcess
            handleSetStep={handleSetStep}
            isLoading={isLoading}
            isSuccess={isSuccess}
            setLoginDetails={setLoginDetails}
          />
        ) : step === 3 ? (
          <SetUpSuccess toggleLogin={setIsLogin} loginDetails={loginDetails} />
        ) : (
          step === 4 && <SetupNewUserLoginForm toggleLogin={toggleLogin} />
        )}
      </Main>
    </Body>
  );
};

export const getServerSideProps: GetServerSideProps = protectedRouteProps(true);

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
