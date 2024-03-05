import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Cards from "../card/cards.compoent";
// import "antd/dist/antd.css";
import { Popover } from "antd";

const TaskList = styled.div`
  padding: 8px 5px 8px 8px;
  // transition: background-color 0.1s ease;
  flex-grow: 1;
  // background-color:${(props) => (props.isDraggingOver ? "lightgrey" : "")};
  // margin:${(props) => (props.isDraggingOver ? "1px" : "3px")};
  // border:${(props) =>
    props.isDraggingOver ? "2px dotted rgb(42, 32, 51)" : ""};
  border-radius: 4px;
  height: 100%;
`;

export default class Lists extends React.Component {
  render() {
    const {
      customCardFilters,
      color,
      openPopover,
      setopenPopover,
      dragHappen2,
    } = this.props;
    const Container = styled.div`
      margin: 4px;
      border-radius: 2px;
      display: flex;
      flex-direction: column;
      height: calc(100% - 55px);
    `;

    return (
      <Container>
        <Droppable
          droppableId={this.props.elemId}
          type={"statusFilter"}
          style={{ height: "100%" }}
        >
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
              color={color}
            >
              {this.props.lists.map((list, index) => {
                return (
                  <>
                    <Cards
                      key={list.id}
                      list={list}
                      index={index}
                      customCardFilters={customCardFilters}
                      color={color}
                    />
                  </>
                );
              })}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}
