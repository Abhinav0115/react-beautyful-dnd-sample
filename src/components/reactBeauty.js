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
    background: isDraggingOver ? "lightred" : "lightgray",
    padding: 10,
    width: 250,
});

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: 16,
    margin: "0 0 8px 0",
    background: isDragging ? "lightblue" : "grey",
    ...draggableStyle,
});

const ReactBeauty = () => {
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
            <h1 className="text-center fw-bold">1st react beautiful DND</h1>
            <div className="text-center">Drag and Drop sample 1</div>
            <div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provider, snapshots) => (
                            <div
                                {...provider.droppableProps}
                                ref={provider.innerRef}
                                style={getListStyle(snapshots.isDraggingOver)}
                            >
                                {items.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                    >
                                        {(provider, snapshots) => (
                                            <div
                                                className="card"
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

export default ReactBeauty;
