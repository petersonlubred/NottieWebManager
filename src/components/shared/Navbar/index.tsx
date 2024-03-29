import { Light, LightFilled, Logout, Notification, User } from '@carbon/icons-react';
import { Dropdown } from 'carbon-components-react';
import { NextRouter, useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { setMode } from '@/redux/slices/util';
import { RootState } from '@/redux/store';
import { px } from '@/utils';

import Logo from '../Logo';

const Navbaritem = [
  { title: 'Dashboard', route: 'dashboard' },
  { title: 'Alerts and Notification', route: 'alert' },
  { title: 'System Configuration', route: 'configuration' },
  { title: 'User Management', route: 'accounts' },
  { title: 'Profile Subscription', route: 'profile' },
];

const Navbar = () => {
  const { mode } = useSelector((state: RootState) => state.sharedReducer);
  const router: NextRouter = useRouter();
  const dispatch = useDispatch();
  const currentRoute = router.pathname.split('/')[1];

  const handleLogout = async () => {
    await dispatch({
      type: 'logout',
    });
    // router.push('/');
  };

  return (
    <NavbarContainer>
      <NavSectionOne>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        {Navbaritem.map((item, index) => (
          <NavList key={index} active={currentRoute === item?.route}>
            {index === 2 ? (
              <Dropdown
                ariaLabel="Dropdown"
                id="dropdown"
                items={[
                  {
                    id: 'option-1',
                    label: 'System Configuration',
                  },
                ]}
                label={item?.title}
                onChange={() => {
                  router.push(`/${item?.route}`);
                }}
              />
            ) : (
              <NavbarItem
                active={currentRoute === item?.route}
                onClick={() => {
                  router.push(`/${item?.route}`);
                }}
              >
                {item?.title}
              </NavbarItem>
            )}
          </NavList>
        ))}
      </NavSectionOne>
      <NavSectionTwo>
        <NavIconItem
          onClick={() => {
            mode === 'light' ? dispatch(setMode('dark')) : dispatch(setMode('light'));
          }}
        >
          {mode === 'light' ? <Light size={20} /> : <LightFilled size={20} />}
        </NavIconItem>
        <NavIconItem>
          <Notification size={20} />
        </NavIconItem>
        <NavIconItem>
          <User size={20} />
        </NavIconItem>
        <NavIconItem onClick={() => handleLogout()}>
          <Logout size={20} />
        </NavIconItem>
      </NavSectionTwo>
    </NavbarContainer>
  );
};

export default Navbar;

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  color: ${({ theme }) => theme.colors.white};
  position: sticky;
  top: 0;
  z-index: 1000;
`;
const LogoContainer = styled.div`
  padding-left: ${px(27)};
  padding-right: ${px(19)};
  border-right: 1px solid ${({ theme }) => theme.colors.darkPrimary50};
  margin-right: ${px(16)};
  cursor: pointer;
`;
const NavSectionOne = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavList = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  #dropdown {
    max-height: 10rem;
    height: ${px(53)};
    background-color: ${({ theme, active }) => (active ? theme.colors.bgHover : theme.colors.bgPrimary)};

    border: none;
    outline: none;

    &:hover {
      background-color: ${({ theme }) => theme.colors.bgHover};
    }
    button:focus {
      outline: none;
    }
    button span,
    button svg {
      fill: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;

type NavbarItemProps = { active?: boolean };

const NavbarItem = styled.div<NavbarItemProps>`
  background-color: ${({ theme, active }) => active && theme.colors.bgHover};
  padding: ${px(16)};
  &:hover {
    background-color: ${({ theme }) => theme.colors.bgHover};
    cursor: pointer;
  }
`;

const NavSectionTwo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavIconItem = styled.div`
  padding: ${px(15)};
  height: ${px(53)};
  border-left: 1px solid ${({ theme }) => theme.colors.darkPrimary50};
  &:hover {
    background-color: ${({ theme }) => theme.colors.bgHover};
    cursor: pointer;
  }
`;
