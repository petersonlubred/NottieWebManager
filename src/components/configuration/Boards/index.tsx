import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { boardType, IDataSourceType, ServiceModelType, ServiceType } from '@/interfaces/configuration';
import { IServiceMapping } from '@/interfaces/serviceMapping';
import { px } from '@/utils';

import Board from './Board';
interface Iprops {
  data: IServiceMapping[];
  opened: number[];
  toggleDropdown: (_index: number) => void;
  dataSource?: IDataSourceType[];
}
const Boards = ({ data, opened, toggleDropdown, dataSource }: Iprops) => {
  let Index = 0;
  const boards: boardType[] = [
    {
      id: 'A',
      title: 'Unmapped Services',
      items: data?.map((item: IServiceMapping, index: number) => ({
        id: index,
        title: item.serviceType,
        serviceMapModels: item.serviceMapModels.map((service: { serviceName: string; serviceId: string; id: string }) => ({
          serviceName: service.serviceName,
          serviceId: service.serviceId,
          id: Index++,
        })),
      })),
    },
    ...(dataSource?.map((item: IDataSourceType, index) => ({
      id: index === 0 ? 'B' : 'C', // TODO: change this to dynamic
      title: item.databaseName,
      items: [],
    })) || []),
  ];
  const [boardsData, setBoardsData] = useState<typeof boards>(boards);

  const getSourceData = (source: { droppableId: string; index: number }, draggableId: string) => {
    const board = boardsData.find((b: boardType) => b.id === source.droppableId);
    const sourceItem = board?.items.find((i: ServiceType) => i.title === draggableId.split(':')[0]);
    return { sourceItem, board };
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    const { sourceItem } = getSourceData(source, draggableId);
    const destinationBoard = destination && getSourceData(destination, draggableId)?.board;

    const serviceMapModels = sourceItem?.serviceMapModels || [];
    const updatedSourceItems = [...serviceMapModels];
    const index = updatedSourceItems?.findIndex((item) => item.id === source.index);

    const handleRemoveItem = (isDest?: boolean, isCopy?: true) => {
      if (index !== -1 && !isCopy) {
        updatedSourceItems?.splice(index, 1);
      }
      if (updatedSourceItems?.length === 0) {
        setBoardsData((prevBoardsData: typeof boards) =>
          prevBoardsData.map((b: boardType) => {
            if (b.id === source.droppableId) {
              b.items = b.items.filter((i: ServiceType) => i.title !== draggableId.split(':')[0]);
            }
            if (b.id === destination?.droppableId && isDest) {
              b.items = updatedDestinationItems;
            }
            return b;
          })
        );
      } else {
        setBoardsData((prevBoardsData: typeof boards) =>
          prevBoardsData.map((b: boardType) => {
            if (b.id === source.droppableId) {
              b.items = b.items.map((item: ServiceType) => {
                if (item.title === draggableId.split(':')[0]) {
                  item.serviceMapModels = updatedSourceItems;
                }
                return item;
              });
            }
            if (b.id === destination?.droppableId && isDest) {
              b.items = updatedDestinationItems;
            }
            return b;
          })
        );
      }
    };

    // if dropped outside the list or dropped into the same list or dropped into the first list, do nothing
    if ((!destination && source.droppableId === 'A') || destination?.droppableId === 'A' || source.droppableId === destination?.droppableId) {
      return;
    } else if (!destination) {
      handleRemoveItem();
      return;
    }
    if (source.droppableId !== destination?.droppableId) {
      const destItem = destinationBoard?.items.find((i: ServiceType) => i.title === draggableId.split(':')[0]);
      const itemExists = destItem?.serviceMapModels.find((s: ServiceModelType) => s.id === source.index);
      if (itemExists) {
        return;
      }
    }

    // TODO: Reorder the items in the destination board
    const updatedDestinationItems = destinationBoard?.items.find((i: ServiceType) => i.title === draggableId.split(':')[0])
      ? destinationBoard?.items.map((item: ServiceType) => {
          if (item.title === draggableId.split(':')[0] && sourceItem) {
            item.serviceMapModels = [...item.serviceMapModels, sourceItem.serviceMapModels[index]];
            return item;
          }
          return item;
        })
      : ([
          ...(destinationBoard?.items || []),
          {
            title: draggableId.split(':')[0],
            serviceMapModels: [sourceItem?.serviceMapModels[index]],
          },
        ] as ServiceType[]);

    // If the source is not the first board, remove the item from the source board
    if (source.droppableId !== 'A') {
      handleRemoveItem(true);
      return;
    } else {
      handleRemoveItem(true, true);
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <CardBox>
          {boardsData?.map((board: boardType) => (
            <Board key={board.id} board={board} opened={opened} toggleDropdown={toggleDropdown} />
          ))}
        </CardBox>
      </DragDropContext>
    </div>
  );
};

export default Boards;

const CardBox = styled.div`
  display: flex;
  width: 100%;
  gap: ${px(12)};
`;
