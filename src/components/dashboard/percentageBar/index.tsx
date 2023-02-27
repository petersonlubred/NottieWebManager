import React from 'react';
import styled from 'styled-components';

import { px } from '@/utils';

interface IProp {
  size?:string;
  color?:string;
}


const PercentageBar:React.FC<IProp> = () => {
  return (
    <BarContainer>
      <Bar size="43%" color='#0E6027'>43%</Bar>
      <Bar size="27%" color="#0258F0">27%</Bar>
      <Bar size="8%" color="#DEA504">8%</Bar>
      <Bar size="7%" color="#BA1B23">7%</Bar>
      <Bar size="6%" color="#4C4C4C">6%</Bar>
    </BarContainer>
  );
};

export default PercentageBar;

const BarContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Bar = styled.div<{ size?: string, color?:string }>`
  width: ${(props) => props.size};
  height:${px(32)};
  text-align: left;
  background-color: ${(props)=>props.color};
  padding-left:${px(4)};
  padding-top: ${px(10)};
  color:${({theme})=>theme.colors.white}
`;
