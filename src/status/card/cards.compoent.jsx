import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import apiClient from "../../apiClient";
import useProofs from "../../hooks/useProof";
import { Collapse, Image } from "antd";

const Container = styled.div`
  padding: 10px 8px 10px 4px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  background: #ffffff;
  border: 1px solid #ecf0fa;
  box-shadow: 0 2px 4px 0 rgba(7, 17, 55, 0.06);
  border-radius: 4px;

  & > * {
    background: #ffffff !important;
  }
`;

const TooltipBox = styled.div`
  background-color: #fff;
  padding: 8px 8px;
  border-radius: 4px;
  border: 1px solid;
  visibility: hidden;
  position: absolute;
  margin: 40px 40px;
  z-index: 1;
  transition: visibility 0.3s, color 0.3s, background-color 0.3s, width 0.3s,
    padding 0.3s ease-in-out;
`;

const TooltipHeading = styled.ul`
  font-family: Inter-Regular;
  font-size: 12px;
  color: #3a435e;
  letter-spacing: 0;
  line-height: 1.8;
  font-family: Inter;
  list-style-type: none;
`;

const TooltipList = styled.li`
  font-family: Inter;
  font-size: 12px;
  color: #8892b2;
  letter-spacing: 0;
  line-height: normal;
  list-style-type: none;
  padding: 4px 4px;
`;

const LabelHeading = styled.div`
  font-family: Inter-Regular;
  font-size: 12px;
  color: #3a435e;
  letter-spacing: 0;
  line-height: 1.8;
  font-family: Inter;
  ${"" /* word-break: break-all; */}
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Label1 = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4px;
  postiton: relative;

  & :hover + ${TooltipBox} {
    visibility: visible;
  }
`;
const Values = styled.p`
  font-family: Inter;
  font-size: 12px;
  color: #8892b2;
  letter-spacing: 0;
  line-height: normal;
`;

const Images = ({ id }) => {
  const proofs = useProofs(id);
  return (
    <div style={{ padding: 10 }}>
      <Collapse>
        <Collapse.Panel key="images" header={"Images"}>
          {proofs.map((p) => {
            return <Image src={p.image} style={{ maxWidth: 200 }} />;
          })}
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};
class Cards extends React.Component {
  // const [images,setImages] = useState([])
  render() {
    const { customCardFilters, color, taskKey } = this.props;
    return (
      <Draggable
        draggableId={`${this.props.list.requestId}`}
        index={this.props.index}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <div className="card-container" style={{ borderColor: color }}>
              {customCardFilters.map((key, index) => {
                if (Array.isArray(this.props.list[key])) {
                  return (
                    <Label1 key={index}>
                      <LabelHeading>{_.startCase(key)}</LabelHeading>
                      <Values>{this.props.list[key][0]}</Values>
                      <TooltipBox>
                        <TooltipHeading>{_.startCase(key)}</TooltipHeading>
                        {this.props.list[key].map((listVal) => {
                          return <TooltipList>{listVal}</TooltipList>;
                        })}
                      </TooltipBox>
                    </Label1>
                  );
                } else {
                  return (
                    <Label1 key={index}>
                      <LabelHeading>{_.startCase(key)}</LabelHeading>
                      <Values>{this.props.list[key]}</Values>
                    </Label1>
                  );
                }
              })}
            </div>
            <Images id={this.props.list.requestId} />
          </Container>
        )}
      </Draggable>
    );
  }
}

const mapStateToProps = (state) => ({
  customCardFilters: state.customFields.fieldFilters,
});

export default Cards;
