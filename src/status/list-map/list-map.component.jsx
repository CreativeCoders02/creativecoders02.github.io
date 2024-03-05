import React from "react";
import Lists from "../lists/lists.compoent";
import {
  Title,
  HeaderContainer,
  IconContainer,
  CountContainer,
} from "../styled";

class ListsMap extends React.Component {
  render() {
    const {
      column,
      loadList,
      lane,
      elemId,
      customCardFilters,
      totalColumns,
      taskKey,
      taskKeyCollection,
      openPopover,
      setopenPopover,
      dragHappen2
    } = this.props;

    console.log(loadList);

    const lists = loadList.filter((data, index) =>
      column[taskKeyCollection].includes(data[taskKey])
    );

    console.log(lists);

    return (
      <div className="list-wrapper">
        <HeaderContainer>
          <IconContainer color={column.color}></IconContainer>
          <Title key={column.id}>{column.title}</Title>
          <CountContainer>
            <p>{column[taskKeyCollection].length}</p>
          </CountContainer>
        </HeaderContainer>
        <Lists
          color={column.color}
          totalColumns={totalColumns}
          customCardFilters={customCardFilters}
          column={column}
          lists={lists}
          lane={lane}
          elemId={elemId}
          taskKey={taskKey}
          openPopover={openPopover}
          setopenPopover={setopenPopover}
          dragHappen2={dragHappen2}
        />
      </div>
    );
  }
}

export default ListsMap;
