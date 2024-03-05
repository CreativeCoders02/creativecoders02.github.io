import React, { useContext, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import ListsMap from "./list-map/list-map.component";
import { dragItem, onDragColumn, initialToggleFilter } from "./helper";

import { Container, HomePage, MainContainer } from "./styled";
import "./kanban.css";

const Kanban = ({
  toggleCarrierFilter = false,
  columnData,
  setColumnData,
  slotRequests,
  toggleFilterData,
  taskKey = "expenseId",
  taskKeyCollection = "expenseIds",
}) => {
  const loadList = slotRequests;
  const [toggleFilterState] = useState(toggleFilterData || initialToggleFilter);
  const fieldFilter = ["name", "username", "requestId","items"];

  const mainColumnState = columnData;
  const mainSetColumnState = setColumnData;

  const columnOrder = mainColumnState.columnOrder;
  const columnList = mainColumnState.columns;

  const [openPopover, setopenPopover] = useState({
    open: false,
    claimId: "",
    content: [],
    selected: "",
    result: null,
  });

  const dragHappen = async (result) => {
    mainSetColumnState((pre) => ({
      ...pre,
      columns: dragItem(pre, result, taskKey, taskKeyCollection),
    }));
  };

  const dragHappen2 = async (result, status) => {
    console.log(result, status, "dragHappen2");

    setopenPopover({
      open: false,
      claimId: "",
      content: [],
      selected: "",
      result: null,
    });
  };

  const dragColumn = (result) => {
    mainSetColumnState({
      ...mainColumnState,
      columnOrder: onDragColumn(result),
    });
  };

  const onDragEnd = (result) => {
    const { destination, source, type } = result;
    const columnOrder = ["column-1", "column-2", "column-3", "column-4"];
    console.log(result);
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const sourceIndex = columnOrder.findIndex(
      (values) => values === source.droppableId
    );
    const destinationIndex = columnOrder.findIndex(
      (values) => values === destination.droppableId
    );
    if (destinationIndex < sourceIndex && sourceIndex !== 8) {
      return;
    }
    if (type === "column") {
      dragColumn(result);
    } else {
      setopenPopover({
        open: false,
        claimId: "",
        content: [],
        result: null,
      });

      dragHappen(result);
    }
  };
  return (
    <>
      <HomePage>
        <MainContainer>
          <DragDropContext onDragEnd={onDragEnd}>
            <Container total={columnOrder.length}>
              {columnOrder.map((columnId, index) => {
                const column = columnList[columnId];
                const key = column.id;
                return (
                  <ListsMap
                    loadList={loadList}
                    key={key}
                    elemId={key}
                    column={column}
                    index={index}
                    lane={key}
                    customCardFilters={fieldFilter}
                    totalColumns={columnOrder.length}
                    taskKey={taskKey}
                    taskKeyCollection={taskKeyCollection}
                    openPopover={openPopover}
                    setopenPopover={setopenPopover}
                    dragHappen2={dragHappen2}
                  />
                );
              })}
            </Container>
          </DragDropContext>
        </MainContainer>
      </HomePage>
    </>
  );
};

export default Kanban;
