import Card from "./components/Card";
import SignIn from "./components/SignIn";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<SignIn />} />
      <Route path="/question" element={<Card />} />
    </>
  )
);

export default Router;
