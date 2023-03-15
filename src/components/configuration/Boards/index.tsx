import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';

import Loader from '@/components/shared/Loader';
import { useToast } from '@/context/ToastContext';
import { boardType, ServiceModelType, ServiceType } from '@/interfaces/configuration';
import { IServiceMapping, MappedType } from '@/interfaces/serviceMapping';
import { useCreateMappingMutation, useDeleteMappingMutation, useUpdateMappingMutation } from '@/redux/api';
import { px } from '@/utils';

import Board from './Board';
interface Iprops {
  data: IServiceMapping[];
  opened: string[];
  toggleDropdown: (_index: string) => void;
  mapped?: any;
}
const Boards = ({ data, opened, toggleDropdown, mapped }: Iprops) => {
  const { toast } = useToast();
  const [createMapping, { isLoading: isCeating }] = useCreateMappingMutation();
  const [updateMapping, { isLoading }] = useUpdateMappingMutation();
  const [deleteMapping, { isLoading: Loading }] = useDeleteMappingMutation();

  const handleUpdateOnDrag = async (values: any, isUpdate?: any) => {
    try {
      isUpdate ? await updateMapping(values).unwrap() : await createMapping(values).unwrap();
      toast('success', 'Service mapped successfully');
    } catch (error: any) {
      toast('error', error?.data?.message || error?.data?.title || 'Something went wrong');
    }
  };

  const handleDeleteMapping = async (id: string) => {
    try {
      await deleteMapping({ id: id }).unwrap();
      toast('success', 'Service unmapped successfully');
    } catch (error: any) {
      toast('error', error?.data?.message || error?.data?.title || 'Something went wrong');
    }
  };

  let Index = 0;
  const boards: boardType[] = [
    {
      id: 'A',
      title: 'Unmapped Services',
      items: data
        ?.filter((item: IServiceMapping) => item.serviceMapModels.length > 0)
        .map((item: IServiceMapping, index: number) => {
          return {
            id: index,
            title: item.serviceType,
            serviceMapModels: item.serviceMapModels.map((service: { serviceName: string; serviceId: string; id: string }) => ({
              serviceName: service.serviceName,
              serviceId: service.serviceId,
              id: Index++,
            })),
          };
        }),
    },
    ...(mapped?.map((item: MappedType) => ({
      id: item?.dataSourceId,
      title: item.databaseName,
      items: item?.serviceMapModels.map((service: IServiceMapping, index: number) => ({
        id: index,
        title: service.serviceType,
        serviceMapModels: service.serviceMapModels.map((service: { serviceName: string; serviceId: string; id: string }) => ({
          serviceName: service.serviceName,
          serviceId: service.id,
          id: Index++,
        })),
      })),
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

    const handleMoveItem = async (isDest?: boolean, isUpdate?: boolean) => {
      if (index !== -1) {
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
      if (!isDest) {
        await handleDeleteMapping(draggableId.split(':')[1]);
      } else {
        if (isUpdate) {
          await handleUpdateOnDrag({
            dataSourceId: destination?.droppableId,
            serviceId: draggableId.split(':')[1],
          });
        } else {
          await handleUpdateOnDrag(
            {
              dataSourceId: destination?.droppableId,
              serviceId: draggableId.split(':')[1],
            },
            true
          );
        }
      }
    };

    // if dropped outside the list or dropped into the same list or dropped into the first list, do nothing
    if ((!destination && source.droppableId === 'A') || destination?.droppableId === 'A' || source.droppableId === destination?.droppableId) {
      return;
    } else if (!destination) {
      handleMoveItem();
      return;
    }
    if (source.droppableId !== destination?.droppableId) {
      const destItem = destinationBoard?.items.find((i: ServiceType) => i.title === draggableId.split(':')[0]);
      const itemExists = destItem?.serviceMapModels.find((s: ServiceModelType) => s.id === source.index);
      if (itemExists) {
        return;
      }
    }

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
    if (destination?.droppableId !== 'A') {
      handleMoveItem(true, true);
    } else {
      handleMoveItem(true);
    }
  };

  return (
    <div>
      {(isLoading || Loading || isCeating) && <Loader />}
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
