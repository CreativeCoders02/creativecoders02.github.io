export const dragItem = (
  state,
  result,
  taskKey = "id",
  taskKeyCollection = "expenseIds"
) => {
  const { destination, source, draggableId, type } = result;
  console.log(result);

  if (type === "statusFilter") {
    const start = state.columns[source.droppableId];
    // console.log(JSON.stringify(column))
    const finish = state.columns[destination.droppableId];
    if (source.droppableId === destination.droppableId) {
      let newTaskIds = Array.from(start[taskKeyCollection]);

      console.log(newTaskIds, "before remove");
      const removedItem = newTaskIds.splice(source.index, 1);
      console.log(newTaskIds, "after remove", removedItem);
      newTaskIds.splice(destination.index, 0, removedItem[0]);
      console.log(newTaskIds, "after added");

      const newColumn = {
        ...start,
        [taskKeyCollection]: newTaskIds,
      };
      console.log("case 1");

      return { ...state.columns, [source.droppableId]: newColumn };
    }
    //moving from one list to another
    let startTaskIds = Array.from(start[taskKeyCollection]);
    const draggedItem = startTaskIds.splice(source.index, 1);
    console.log(startTaskIds);
    const newStart = {
      ...start,
      [taskKeyCollection]: startTaskIds,
    };
    let finishTaskIds = Array.from(finish[taskKeyCollection]);
    finishTaskIds.splice(destination.index, 0, draggedItem[0]);
    const newFinish = {
      ...finish,
      [taskKeyCollection]: finishTaskIds,
    };
    console.log(finishTaskIds);
    console.log("case 2");
    return {
      ...state.columns,
      [source.droppableId]: newStart,
      [destination.droppableId]: newFinish,
    };
  } else {
    const start = state.columns[source.droppableId.split("|")[1]];
    // console.log(JSON.stringify(column))
    const finish = state.columns[destination.droppableId.split("|")[1]];

    if (source.droppableId === destination.droppableId) {
      console.log("case 3");
      const newTaskIds = Array.from(start[taskKeyCollection]);
      // console.log(`New taskIds: ${newTaskIds}`);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        [taskKeyCollection]: newTaskIds,
      };
      return {
        ...state.columns,
        [source.droppableId.split("|")[1]]: newColumn,
      };
    } else if (
      source.droppableId.split("|")[1] !==
        destination.droppableId.split("|")[1] &&
      source.droppableId.split("|")[0] === destination.droppableId.split("|")[0]
    ) {
      console.log("case 4");
      const startTaskIds = Array.from(start[taskKeyCollection]);
      const newSourceIndex = startTaskIds.indexOf(draggableId);
      startTaskIds.splice(newSourceIndex, 1);
      const newStart = {
        ...start,
        [taskKeyCollection]: startTaskIds,
      };

      const finishTaskIds = Array.from(finish[taskKeyCollection]);
      // if(source.index >= destination.index) {
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        [taskKeyCollection]: finishTaskIds,
        // }
      };
      return {
        ...state.columns,
        [source.droppableId.split("|")[1]]: newStart,
        [destination.droppableId.split("|")[1]]: newFinish,
      };
    } else {
      return { ...state.columns };
    }
  }
};

export const onDragColumn = (state, result) => {
  const { destination, source, draggableId, type } = result;
  if (type === "column") {
    const newColumnOrder = Array.from(state.columnOrder);
    newColumnOrder.splice(source.index, 1);
    newColumnOrder.splice(destination.index, 0, draggableId);

    return [...newColumnOrder];
  }
};

export const initialToggleFilter = {
  fieldFilters: [
    "expenseId",
    "expenseType",
    "fuelType",
    "totalAmount",
    "selectFleetType",
    "selectFleetNumber",
  ],
};
