import React, { useState, useEffect } from "react";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

const data = [
    { id: uuid(), title: "Task-1", content: "Task-1 Content" },
    { id: uuid(), title: "Task-2", content: "Task-2 Content" },
    { id: uuid(), title: "Task-3", content: "Task-3 Content" },
    { id: uuid(), title: "Task-4", content: "Task-4 Content" },
    { id: uuid(), title: "Task-5", content: "Task-5 Content" },
    { id: uuid(), title: "Task-6", content: "Task-6 Content" },
];

const columnsFromBackend = {
    [uuid()]: {
        name: "To Do",
        items: data,
    },
    [uuid()]: {
        name: "In Progress",
        items: [],
    },
    [uuid()]: {
        name: "Completed",
        items: [],
    },
    [uuid()]: {
        name: "Testing",
        items: [],
    },
};

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgray",
    padding: 10,
    width: 300,
    minHeight: 500,
});

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: "16px 30px",
    margin: "0 0 8px 0",
    minHeight: "50px",
    background: isDragging ? "#eab676" : "grey",
    color: "white",
    ...draggableStyle,
});

const reorder = (column, startIndex, endIndex) => {
    const result = [...column.items];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const MultiDragWithInput = () => {
    const [columns, setColumns] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        setColumns(columnsFromBackend);
    }, []);

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) {
            const sourceCol = columns[source.droppableId];
            const destCol = columns[destination.droppableId];
            const sourceItems = [...sourceCol.items];
            const destItems = [...destCol.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceCol,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destCol,
                    items: destItems,
                },
            });
        } else {
            const column = columns[source.droppableId];
            const reordereItem = reorder(
                column,
                source.index,
                destination.index
            );
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: reordereItem,
                },
            });
        }
    };

    return (
        <div>
            {/* <h1>Multi Drag</h1> */}

            <div className="d-flex  justify-content-around">
                <DragDropContext onDragEnd={onDragEnd}>
                    {Object.entries(columns).map(([id, column]) => {
                        return (
                            <div>
                                <h4 className="text-center">{column.name}</h4>
                                <Droppable droppableId={id} key={id}>
                                    {(provided, snapshots) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={getListStyle(
                                                    snapshots.isDraggingOver
                                                )}
                                                className="rounded-3"
                                            >
                                                {column.items.map(
                                                    (item, index) => {
                                                        return (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={
                                                                    item.id
                                                                }
                                                                index={index}
                                                            >
                                                                {(
                                                                    provided,
                                                                    snapshots
                                                                ) => {
                                                                    return (
                                                                        <div
                                                                            ref={
                                                                                provided.innerRef
                                                                            }
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            style={getItemStyle(
                                                                                snapshots.isDragging,
                                                                                provided
                                                                                    .draggableProps
                                                                                    .style
                                                                            )}
                                                                            className="rounded-3"
                                                                        >
                                                                            <input
                                                                                type="text"
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setInput(
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                                className="form-control rounded-3"
                                                                            />
                                                                        </div>
                                                                    );
                                                                }}
                                                            </Draggable>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        );
                                    }}
                                </Droppable>
                            </div>
                        );
                    })}
                </DragDropContext>
            </div>
        </div>
    );
};

export default MultiDragWithInput;
