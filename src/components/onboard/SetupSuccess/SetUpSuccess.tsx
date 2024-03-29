import { ArrowRight, CheckmarkFilled, Copy } from '@carbon/icons-react';
import { Button } from 'carbon-components-react';
import React from 'react';
import styled from 'styled-components';

import { useToast } from '@/context/ToastContext';
import { ISetState } from '@/interfaces/formik.type';
import { px } from '@/utils';

type IProps = {
  toggleLogin: ISetState<boolean>;
  loginDetails: {
    username: string;
    password: string;
  };
};

const SetUpSuccess = ({ toggleLogin, loginDetails }: IProps) => {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(`username: ${loginDetails?.username} password: ${loginDetails?.password}`);
    toast('info', 'Details copied to clipboard');
  };

  return (
    <SuccessContain>
      <div>
        <CheckmarkFilled style={{ color: '#25AE88' }} className="checked" size={'32'} />
      </div>
      <div style={{ padding: '1rem' }}>
        <h2>The Setup Was Successful</h2>
      </div>
      <SuccessDetails>
        <div className="para">
          <p>We generated a login details for you, please copy and save it.</p>
        </div>
        <div className="para2">
          <p>This account will expire in 2 days and it can only be used to create other accounts.</p>
        </div>

        <div className="inner_div">
          <div>
            <div className="textHead">
              <p>username</p>
            </div>
            <div className="user">
              <p>{loginDetails?.username}</p>
            </div>
          </div>
          <div className="left">
            <div className="textHead">
              <p>password</p>
            </div>
            <div className="password">
              <p>{loginDetails?.password}</p>
            </div>
          </div>
        </div>

        <InnerBtnDiv>
          <Button className="btn" renderIcon={(props: any) => <Copy {...props} size={24} onClick={handleCopy} />} size="xl">
            Copy details
          </Button>
          <Button className="btn2" renderIcon={ArrowRight} size="xl" onClick={() => toggleLogin(true)}>
            Get started
          </Button>
        </InnerBtnDiv>
      </SuccessDetails>
    </SuccessContain>
  );
};

export default SetUpSuccess;

const SuccessContain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
  min-height: calc(100vh - ${px(64)});
  color: ${({ theme }) => theme.colors.white};
`;

const SuccessDetails = styled.div`
  width: 429px;
  min-height: 314px;
  background-color: ${({ theme }) => theme.colors.deepBlack};

  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 400;

  .para p {
    font-size: 24px;
    line-height: 31px;
    padding: 0.8rem;
    color: ${({ theme }) => theme.colors.white};
    text-align: left;
    margin-bottom: 0.5rem;
    flex: none;
    order: 0;
    flex-grow: 0;
  }

  .para2 p {
    font-size: 18px;
    line-height: 23px;
    margin-bottom: 0.6rem;
    padding: 0.5rem;

    color: ${({ theme }) => theme.colors.lightText};
    text-align: left;

    flex: none;
    order: 2;
    flex-grow: 0;
  }

  .inner_div {
    display: flex;
    align-items: center;
    padding: 1rem;
    width: 100%;

    .left {
      margin-left: 6rem;
    }

    .textHead p {
      font-size: 16px;
      line-height: 21px;

      padding: 0.5rem;
      text-transform: uppercase;

      color: ${({ theme }) => theme.colors.bgHover};
      text-align: left;

      flex: none;
      order: 0;
      flex-grow: 0;
    }

    .user p {
      font-size: 16px;
      line-height: 21px;
      padding: 0.5rem;

      color: ${({ theme }) => theme.colors.white};
      text-transform: lowercase;

      flex: none;
      order: 1;
      flex-grow: 0;
    }

    .password p {
      font-size: 16px;
      line-height: 21px;
      padding: 0.5rem;

      color: ${({ theme }) => theme.colors.white};
      text-transform: uppercase;

      flex: none;
      order: 1;
      flex-grow: 0;
    }
  }
`;

const InnerBtnDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 10px;

  .btn {
    width: 50%;
    background-color: ${({ theme }) => theme.colors.bgHover};
    color: ${({ theme }) => theme.colors.white};
    cursor: default;

    &:hover {
      background-color: ${({ theme }) => theme.colors.bgHover};
      color: ${({ theme }) => theme.colors.white};
    }

    svg {
      cursor: pointer;
    }
  }

  .btn2 {
    width: 50%;
    color: ${({ theme }) => theme.colors.black};
  }
`;
