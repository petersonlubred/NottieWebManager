import type { NextPage } from 'next';
import styled from 'styled-components';
import Seo from '../components/seo';
import { px } from '../utils/px/px';
const Home: NextPage = () => {
  return (
    <Body>
      <Seo title="Home" />
      <Main>
        <HeroSection>
          <NewSection>
            <Header>Get Started</Header>
          </NewSection>
        </HeroSection>
      </Main>
    </Body>
  );
};
//TODO: sticky doesn't work with overflow
const Body = styled.div``;
const Main = styled.main`
  /* overflow: hidden; */
`;
const HeroSection = styled.div`
  background-image: url('/spiral.jpg');
  min-height: ${px(900)};
  background-size: cover;
  background-position: center;
  ${({ theme }) => theme.media.md} {
    min-height: ${px(650)};
  }
  ${({ theme }) => theme.media.lg} {
    min-height: ${px(800)};
  }
`;
const NewSection = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  min-height: ${px(900)};
  ${({ theme }) => theme.media.md} {
    min-height: ${px(650)};
  }
  ${({ theme }) => theme.media.lg} {
    min-height: ${px(800)};
  }
`;

const Header = styled.h1`
  position: sticky;
  top: 0;
  z-index: 100;
  padding: ${px(20)};
  ${({ theme }) => theme.media.md} {
    padding: ${px(30)};
  }
  ${({ theme }) => theme.media.lg} {
    padding: ${px(40)};
  }
`;

export default Home;
