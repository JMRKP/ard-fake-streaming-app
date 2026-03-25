import { createBrowserRouter } from "react-router";
import { Home } from "./components/Home";
import { SenderMode } from "./components/SenderMode";
import { ViewerMode } from "./components/ViewerMode";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/sender",
    Component: SenderMode,
  },
  {
    path: "/viewer",
    Component: ViewerMode,
  },
]);
