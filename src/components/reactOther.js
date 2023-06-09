import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const data = [
    {
        id: "item-1",
        title: "item-1 React Beauty",
        description:
            "React Beauty is a React component library based on Ant Design and React Hooks.",
    },
    {
        id: "item-2",
        title: "item-2 React Beauty",
        description:
            "React Beauty is a React component library based on Ant Design and React Hooks.",
    },
    {
        id: "item-3",
        title: "item-3 React Beauty",
        description:
            "React Beauty is a React component library based on Ant Design and React Hooks.",
    },
    {
        id: "item-4",
        title: "item-4 React Beauty",
        description:
            "React Beauty is a React component library based on Ant Design and React Hooks.",
    },
    {
        id: "item-5",
        title: "item-5 React Beauty",
        description:
            "React Beauty is a React component library based on Ant Design and React Hooks.",
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
    width: 250,
});

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: 16,
    margin: "0 0 8px 0",
    background: isDragging ? "lightgreen" : "grey",
    ...draggableStyle,
});

const ReactOther = () => {
    const [items, setItems] = useState([]);

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

        console.log(reOrderItems);
        setItems(reOrderItems);
    };

    return (
        <div>
            <h1 className="text-center fw-bold">2nd react beautiful DND</h1>
            <div className="text-center">Drag and Drop sample 2</div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshots) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshots.isDraggingOver)}
                        >
                            {items.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                >
                                    {(provided, snapshots) => (
                                        <div
                                            className="card"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshots.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            {item.title}: {item.description}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default ReactOther;
