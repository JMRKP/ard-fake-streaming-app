import { createBrowserRouter } from "react-router";
import { Home } from "./components/Home";
import { SenderMode } from "./components/SenderMode";
import { ViewerMode } from "./components/ViewerMode";

// Get the basename from the import.meta.env.BASE_URL (set by Vite)
const basename = import.meta.env.BASE_URL;

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
], {
  basename: basename,
});
