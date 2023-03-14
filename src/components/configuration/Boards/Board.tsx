import React, { useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import AccordionBox from '@/components/shared/AccordionBox';
import Icon from '@/components/shared/Icons';
import { boardType, ServiceType } from '@/interfaces/configuration';
import { px } from '@/utils';

const Board = ({ board, toggleDropdown, opened }: { board: boardType; toggleDropdown: (_index: number) => void; opened: number[] }) => {
  const [enabled, setEnabled] = useState(false);
  const { title, items, id } = board;

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <MappingCard>
      <MappingTitleBox>
        <Icon id="dotted-cube-icon" width={18} height={19} />
        <MappingTitle>{title}</MappingTitle>
      </MappingTitleBox>
      <Droppable droppableId={id}>
        {(provided: any) => (
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item: ServiceType, index: number) => (
              <AccordionBox
                title={item?.title}
                key={index}
                index={index}
                toggleDropdown={toggleDropdown}
                opened={opened.includes(index)}
                itemsOnExpand={
                  <>
                    {item.serviceMapModels.map((model) => (
                      <Draggable key={model.serviceId} draggableId={`${item?.title}:${model?.serviceId}:${id}`} index={Number(model?.id)}>
                        {(provided: any) => (
                          <AccordionItemListBox className="item" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <AccordionListTitle>
                              <Icon id="dotted-cube-icon" width={18} height={19} />
                              <TitleParagraph>{model?.serviceName}</TitleParagraph>
                            </AccordionListTitle>
                            <Icon id="dotted-rectangle-icon" width={6} height={9} />
                          </AccordionItemListBox>
                        )}
                      </Draggable>
                    ))}
                  </>
                }
              />
            ))}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </MappingCard>
  );
};
export default Board;

const Container = styled.div`
  height: calc(100vh - 300px);
  overflow-y: auto;
  padding-bottom: ${px(16)};
`;

const MappingCard = styled.div`
  width: ${px(321)} !important;
  background-color: ${({ theme }) => theme.colors.bgPrimaryLight};
  color: ${({ theme }) => theme.colors.white};
`;

const MappingTitleBox = styled.div`
  display: flex;
  align-items: center;
  padding: ${px(14)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  gap: ${px(6)};

  svg {
    fill: ${({ theme }) => theme.colors.white};
  }
`;

const MappingTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: ${px(20)};
`;

const AccordionItemListBox = styled.div`
  padding: ${px(16)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.borderLight};
  margin-left: ${px(44)};
  margin-right: ${px(33)};
  margin-bottom: ${px(3)};
`;

const AccordionListTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${px(6)};
  svg {
    fill: ${({ theme }) => theme.colors.white};
  }
`;

const TitleParagraph = styled.p`
  font-size: ${px(18)} !important;
`;
