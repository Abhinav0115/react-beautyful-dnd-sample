import { useEffect } from "react";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const data = [
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
    {
        id: "item-7",
        title: "item-7 React Beauty",
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
    minHeight: 500,
});

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: 16,
    margin: "0 0 8px 0",
    background: isDragging ? "#eab676" : "grey",
    ...draggableStyle,
});

const SingleDrop = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        setItems(data);
    }, []);

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const reorderItems = reorder(
            items,
            result.source.index,
            result.destination.index
        );
        setItems(reorderItems);
    };

    return (
        <div>
            <div className="d-flex justify-content-center mt-5">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provider, snapshots) => (
                            <div
                                {...provider.droppableProps}
                                ref={provider.innerRef}
                                style={getListStyle(snapshots.isDraggingOver)}
                                className="rounded-3"
                            >
                                {items.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                    >
                                        {(provider, snapshots) => (
                                            <div
                                                className="card rounded-3"
                                                ref={provider.innerRef}
                                                {...provider.draggableProps}
                                                {...provider.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshots.isDragging,
                                                    provider.draggableProps
                                                        .style
                                                )}
                                            >
                                                {item.title}
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

export default SingleDrop;
