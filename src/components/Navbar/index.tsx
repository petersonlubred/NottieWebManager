import { px } from '@/utils';
import React from 'react';
import styled from 'styled-components';
import Logo from '../Logo';
import { Dropdown } from '@carbon/react';
import { Light, LightFilled, Notification, User } from '@carbon/react/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setMode } from '@/redux/slices/shared';

const Navbaritem = [
  'Dashboard',
  'Alerts and Notification',
  'System Configuration',
  'User Management',
  'Profile Subscription',
];

const Navbar = () => {
  const { mode } = useSelector((state: RootState) => state.sharedReducer);
  const dispatch = useDispatch();

  return (
    <NavbarContainer>
      <NavSectionOne>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        {Navbaritem.map((item, index) => (
          <NavList key={index}>
            {index === 2 ? (
              <Dropdown
                ariaLabel="Dropdown"
                id="dropdown"
                items={[
                  {
                    id: 'option-1',
                    label: 'Option 1',
                  },
                  {
                    id: 'option-2',
                    label: 'Option 2',
                  },
                ]}
                label={item}
              />
            ) : (
              <NavbarItem>{item}</NavbarItem>
            )}
          </NavList>
        ))}
      </NavSectionOne>
      <NavSectionTwo>
        <NavIconItem
          onClick={() => {
            mode === 'light'
              ? dispatch(setMode('dark'))
              : dispatch(setMode('light'));
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

const NavList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  #dropdown {
    max-height: 10rem;
    height: ${px(53)};
    background-color: ${({ theme }) => theme.colors.bgPrimary};
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

const NavbarItem = styled.div`
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
