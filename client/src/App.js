import { RouterProvider } from "react-router-dom";
import Router from "./routes";

function App() {
  return (
    <div className="block ml-auto mr-auto  mt-32">
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
