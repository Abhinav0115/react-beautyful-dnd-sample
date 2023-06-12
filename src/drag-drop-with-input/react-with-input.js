import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

let data = [
    {
        id: "item-1",
        title: "item-1 React Beauty",
    },
    {
        id: "item-2",
        title: "item-2 React Beauty",
    },
    {
        id: "item-3",
        title: "item-3 React Beauty",
    },
    {
        id: "item-4",
        title: "item-4 React Beauty",
    },
    {
        id: "item-5",
        title: "item-5 React Beauty",
    },
    {
        id: "item-6",
        title: "item-6 React Beauty",
    },
];

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgray",
    padding: 10,
    width: 350,
    minHeight: 500,
});

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: "16px 30px",

    margin: "0 0 10px 0",
    background: isDragging ? "lightgreen" : "grey",
    ...draggableStyle,
});

const ReactInput = () => {
    const [items, setItems] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        setItems(data);
    }, []);

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const reOrderItems = reorder(
            items,
            result.source.index,
            result.destination.index
        );

        setItems(reOrderItems);
    };

    return (
        <div className="">
            <div className="d-flex justify-content-center mt-5">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshots) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshots.isDraggingOver)}
                                className="rounded-3"
                            >
                                {items.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                    >
                                        {(provided, snapshots) => (
                                            <div
                                                className="card mt-2 rounded-3"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshots.isDragging,
                                                    provided.draggableProps
                                                        .style
                                                )}
                                            >
                                                <input
                                                    type="text"
                                                    onChange={(e) =>
                                                        setInput(e.target.value)
                                                    }
                                                    className="form-control rounded-3"
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
};

export default ReactInput;
