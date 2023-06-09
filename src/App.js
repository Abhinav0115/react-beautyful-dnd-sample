import React from "react";
import ReactBeauty from "./components/reactBeauty.js";
import ReactOther from "./components/reactOther.js";

const App = () => {
    return (
        <div>
            {<ReactBeauty />}
            <ReactOther />
        </div>
    );
};

export default App;

// import { useState } from "react";
// import { Button } from "./Button.js";
// import { ListComponent } from "./ListComponent.js";
// import "bootstrap/dist/css/bootstrap.min.css";

// function App() {
//     const [components, setComponents] = useState([{ employment: "" }]);

//     function addComponent() {
//         setComponents([...components, { employment: "" }]);
//     }
//     const deleteComponent = (i) => {
//         const list = [...components];
//         list.splice(i, 1);
//         setComponents(list);
//     };

//     return (
//         <div>
//             <Button onClick={addComponent} text="Call Component" />
//             <Button onClick={deleteComponent} text="delete components" />
//             {components.map((item, i) => (
//                 <ListComponent text={item} />
//             ))}
//         </div>
//     );
// }

// export default App;
