import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const boards = [
  {
    id: 'A',
    title: 'Board A',
    items: [
      { id: '1', title: 'Test-1' },
      { id: '2', title: 'Test-2' },
      { id: '3', title: 'Test-3' },
    ],
  },
  { id: 'B', title: 'Board B', items: [] },
  { id: 'C', title: 'Board C', items: [] },
];

const Board = ({ board }: any) => {
  const [enabled, setEnabled] = useState(false);
  const { id, title, items } = board;

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
    <div className="board">
      <h2>{title}</h2>
      <Droppable droppableId={id}>
        {(provided: any) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item: any, index: any) => (
              <Draggable key={item?.id} draggableId={item?.id} index={index}>
                {(provided: any) => (
                  <div className="item" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    {item?.title}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

const Boards = () => {
  const [boardsData, setBoardsData] = useState<any>(boards);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    const sourceBoard = boardsData.find((b: any) => b.id === source.droppableId);
    const destinationBoard = boardsData.find((b: any) => b.id === destination?.droppableId);

    if ((!destination && source.droppableId === 'A') || destination?.droppableId === 'A') {
      return;
    } else if (!destination) {
      // If the destination is null and the source is not the first board, remove the item from the source board
      const updatedSourceItems = [...sourceBoard.items];
      updatedSourceItems.splice(source.index, 1);
      setBoardsData((prevBoardsData: any) =>
        prevBoardsData.map((b: any) => {
          if (b.id === source.droppableId) {
            return {
              ...b,
              items: updatedSourceItems,
            };
          }
          return b;
        })
      );
      return;
    }

    // If dropped back into the same droppable area and at the different index, update the index
    if (source.droppableId === destination.droppableId && source.index !== destination.index) {
      const board = boardsData.find((b: any) => b.id === source.droppableId);
      const updatedItems = [...board.items];
      const [removed] = updatedItems.splice(source.index, 1);
      updatedItems.splice(destination.index, 0, removed);
      setBoardsData((prevBoardsData: any) =>
        prevBoardsData.map((b: any) => {
          if (b.id === source.droppableId) {
            return {
              ...b,
              items: updatedItems,
            };
          }
          return b;
        })
      );
    }

    // If dropped into a different droppable area, update the data
    if (source.droppableId !== destination.droppableId) {
      //check if the item already exists in the destination
      const itemExists = destinationBoard?.items.find(
        (i: any) => i.id.slice(0, -1) === sourceBoard.items[source.index].id.slice(0, -1) || i.id.slice(0, -1) === sourceBoard.items[source.index].id
      );

      if (itemExists) {
        return;
      }
      let updatedSourceItems: any, updatedDestinationItems: any;
      if (source.droppableId === 'A') {
        updatedSourceItems = [...sourceBoard.items];
        updatedDestinationItems = [...destinationBoard.items, { ...sourceBoard.items[source.index], id: `${sourceBoard.items[source.index].id}${destination.droppableId}` }];
      } else {
        updatedSourceItems = [...sourceBoard.items];
        updatedDestinationItems = [...destinationBoard.items];
        const [removed] = updatedSourceItems.splice(source.index, 1);
        updatedDestinationItems.splice(destination.index, 0, removed);
      }
      setBoardsData((prevBoardsData: any) =>
        prevBoardsData.map((b: any) => {
          if (b.id === source.droppableId) {
            return {
              ...b,
              items: updatedSourceItems,
            };
          }
          if (b.id === destination.droppableId) {
            return {
              ...b,
              items: updatedDestinationItems,
            };
          }
          return b;
        })
      );
    }
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        <BoardContainer className="boards">
          {boardsData.map((board: any) => (
            <Board key={board.id} board={board} />
          ))}
        </BoardContainer>
      </DragDropContext>
    </div>
  );
};

export default Boards;

const BoardContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem;

  .board {
    border: 1px solid #ccc;
    padding: 1rem;
  }
`;
