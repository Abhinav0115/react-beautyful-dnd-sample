import React from "react";
import SingleDrop from "./single-drag-drop/react-single.js";
import ReactInput from "./drag-drop-with-input/react-with-input.js";
import MultiDrag from "./multiple-drag-drop/multi-drag.js";
import MultiDragWithInput from "./multiple-drag-drop-with-input/multi-drag-with-input.js";

const App = () => {
    return (
        <div>
            <div className="mb-5 mt-4">
                <h2 className="text-center mb-4">Single drag and drop box</h2>
                <SingleDrop />
            </div>

            <div className="mb-5">
                <hr />
                <h2 className="text-center mb-4">Multiple drag and drop box</h2>

                <MultiDrag />
            </div>
            <div className="mb-5">
                <hr />
                <h2 className="text-center mb-4">
                    Single drag and drop with input box
                </h2>
                <ReactInput />
            </div>
            <div className="mb-5">
                <hr />
                <h2 className="text-center mb-4">
                    Multiple drag and drop with input box
                </h2>
                <MultiDragWithInput />
            </div>
        </div>
    );
};

export default App;
